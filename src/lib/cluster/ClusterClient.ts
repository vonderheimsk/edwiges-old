import { Client } from '@client/Client';
import { ClientOptions } from '@interfaces';
import { IPC } from './IPC';

export class ClusterClient extends Client {
  public IPC: IPC;
  
  public constructor(token: string, options: ClientOptions) {
    super(token, options);
    this.IPC = new IPC(process.pid, this);
  }
}