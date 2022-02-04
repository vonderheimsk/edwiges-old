import { Client } from "../client/Client";
import { Collection } from "../structures/Collection";
import { Shard } from "./Shard";

/**
 * Represents a gateway manager.
 * @extends Collection
 */
export class GatewayManager extends Collection {
    #client: Client;
    #token: string;

    /**
     * Creates a GatewayManager.
     * @param {Client} client The client's object.
     * @param {string} token The client's token.
     */
    public constructor(client: Client, token: string) {
        super(Shard);
        this.#client = client;
        this.#token = token;
    }

    /**
     * Initialize the gateway manager.
     * @returns {void}
     */
    public setup(): void {
        if(this.#client.options.connectOneShardAtTime !== true) {
            for(let i = 0; i < (this.#client.options.shards || 0); i++) {
                this.spawn((this.#client.options.first_shard_id || 0) + i);
            }
        } else {
            this.spawn(this.#client.options.first_shard_id || 0);
        }
    }

    /**
     * Initialize a shard.
     * @param {number} id The shard's id.
     */
    public spawn(id: number) {
        let shard = this.get<Shard>(id);
        if(!shard) {
            shard = super.set(id, new Shard(this.#client, this.#token, id));
            shard.on('shardReady', (id: number) => {
                let connectedShards = Array.from(this.values()).filter(shard => shard.ready);

                if(connectedShards.length >= (this.#client.options.shards || 0)) {
                    this.#client.emit('ready', this.#client);
                } else if(this.#client.options.connectOneShardAtTime === true) {
                    this.spawn(id + 1);
                }
            });
        }
        
        if(shard) {
            shard.connect();
        }
    }
}