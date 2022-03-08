import { ClientOptions } from '@interfaces';
import { ClusterClient } from './ClusterClient';
import EventEmitter from 'events';
import { IPC } from './IPC';
import cluster from 'cluster';
import { inspect } from 'util';

export interface ClusterClientOptions extends ClientOptions {
  clustering: {
    totalClusters: number;
  }
}

export class ClusterManager extends EventEmitter {
  public options: ClusterClientOptions;
  public workers: Array<any>;
  #token: string;
  
  public constructor(token: string, options?: ClusterClientOptions) {
    super();
    this.#token = token;
    this.options = options || {
      clustering: {
        totalClusters: 2
      },
      sharding: {
        totalShards: 2
      }
    };
    this.workers = [];
  }

  public init(): this {
    if(cluster.isPrimary) {
      let chunks = [];
      let shards = [];
      let sep = (this.options.sharding?.totalShards && typeof this.options.sharding.totalShards === 'number' ? this.options.sharding.totalShards : this.options.clustering.totalClusters) / this.options?.clustering?.totalClusters;
      
      for(let i = 0; i < (this.options?.sharding?.totalShards || this.options?.clustering?.totalClusters); i++) {
        shards.push(i);
      }

      for(let i = 0; i <= shards.length; i += sep) {
        let chunk = shards.slice(i, i + sep);
        if(chunk.length > 0) {
          chunks.push(chunk);
        }
      }

      for(let i = 0; i < this.options?.clustering?.totalClusters; i++) {
        let worker = cluster.fork();
        worker.on('error', () => {
          console.log('eerr');
        })
        worker.send({shards: chunks[i], total: this.options?.sharding?.totalShards, event:'MASTER_INITIAL'});
        this.workers.push(worker);
        worker.on('message', (msg) => {
          if(msg) {
            if(msg.type) {
              switch(msg.type){
                case 'data-request':
                  if(msg.to) {
                    let workery = this.workers.find(w => w.process.pid === msg.to);
                    if(workery) {
                      let id = Math.floor(Math.random() * 100000).toString();
                      workery.send({ from: msg.from, to: worker.process.pid, type: msg.type, data: msg.data, cid: id });
                      const callback = (emsg: any) => {
                        if(emsg) {
                          if(emsg.type === 'data-response' && emsg.cid === id && emsg.from === workery.process.pid && emsg.data !== undefined) {
                            workery.removeListener('message', callback);
                            worker.send({ from: worker.process.pid, to: msg.from, type: 'data-response', cid: msg.cid, data: emsg.data });
                          }
                        }
                      }

                      workery.on('message', callback);
                    }
                  }
                  break;

                case 'broadcast-request':
                  let res: Array<any> = [];
                  let id = Math.floor(Math.random() * 100000).toString();
                  let reqsSents = 0;

                  for(let workery of this.workers) {
                    workery.send({ from: 'master', to: workery.process.pid, type: 'data-request', data: msg.data, cid: id });
                    reqsSents++;
                    const callback = (msg: any) => {
                      if(msg) {
                        if(msg.type === 'data-response' && msg.cid === id && msg.data !== undefined) {
                          worker.removeListener('message', callback);
                          res.push(msg.data)
                        }
                      }
                    }
                    
                    workery.on('message', callback);
                  }
                  
                  let int = setInterval(() => {
                    if(res.length >= reqsSents) {
                      worker.send({ from: 'master', to: worker.process.pid, cid: msg.cid, type: 'broadcast-response', data: res });
                      clearInterval(int);
                    }
                  }, 20)
                  break;
              }
            }
          }
        })
      }

      cluster.on('exit', (worker) => {
        let w = this.workers.findIndex((ww) => ww.process.pid === worker.process.pid);
        if(w !== -1) {
          this.workers.splice(w, 1);
        }
      })
    } else {
      process.on('message', (msg: any) => {
        if(msg.event == 'MASTER_INITIAL') {  
          let client = new ClusterClient(this.#token, {
            sharding: {
              first_shard_id: msg.shards[0],
              last_shard_id: msg.total,
              totalShards: msg.shards.length
            }
          });
  
          this.emit('workerReady', client);
        }
      })
    }

    return this;
  }
}