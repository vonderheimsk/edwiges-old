import { Client } from '@client/Client';

export class IPC {
  public id: string;
  public queue: Array<string>;
  #client: Client
  
  public constructor(id: string | number, client: Client) {
    this.id = id.toString();
    this.queue = [];
    this.#client = client;

    process.setMaxListeners(1000);
    process.on('message', (msg: any) => {
      if(msg) {
        if(msg.type === 'data-request' && msg.cid && msg.data !== undefined) {
          try {
            let evaled = eval(msg.data);
            //@ts-ignore
            process.send({ from: this.id, type: 'data-response', cid: msg.cid, data: evaled });
          } catch(_) {
            //@ts-ignore
            process.send({ from: this.id, type: 'data-response', cid: msg.cid, data: _.message });
          }
        }
      }
    });
  }

  public async sendTo(pid: string, data: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let id = this.generateComID();
      this.queue.push(id);

      //@ts-ignore
      process.send({ from: this.id, to: pid, type: 'data-request', cid: id, data: data });
      const callback = (msg: any) => {
        if(msg) {
          if(msg.cid === id && msg.type === 'data-response' && msg.from === pid && msg.to === this.id) {
            process.removeListener('message', callback);
            this.removeComIDFromQueue(id);
            resolve(msg.data);
          }
        }
      }
      process.on('message', callback); 
    });
  }

  public async broadcast(data: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let id = this.generateComID();
      this.queue.push(id);
      
      //@ts-ignore
      process.send({ from: this.id, type: 'broadcast-request', cid: id, data });
      const callback = (msg: any) => {
        if(msg) {
          if(msg.cid === id && msg.type === 'broadcast-response') {
            process.removeListener('message', callback);
            this.removeComIDFromQueue(id);
            resolve(msg.data);
          }
        }
      }
      process.on('message', callback);
    })
  }

  public generateComID(): string {
    let pid = this.id;
    let id = String(pid.toString() + Math.floor(Math.random() * 100000));
    if(this.queue.includes(id)) {
      return this.generateComID();
    } else {
      return id;
    }
  }

  public removeComIDFromQueue(id: string): void {
    let ind = this.queue.findIndex((i) => i === id);
    if(ind !== -1) {
      this.queue.splice(ind, 1);
    }
  }
}