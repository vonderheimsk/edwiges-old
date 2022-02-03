import { ClientOptions } from "../../interfaces";
import User from "../../interfaces/User";
import GatewayManager from "../gateway/GatewayManager";

let EventEmitter;

try {
    // @ts-ignore
    EventEmitter = require('eventemitter3');
} catch {
    // @ts-ignore
    EventEmitter = require('events');
}

/**
 * Represents a Client.
 * @extends EventEmitter
 * @property {ClientOptions} options The client's options.
 * @property {GatewayManager} shards The shards list.
 * @property {User} user The user object.
 */
export default class Client extends EventEmitter {
    #token: string;
    public options: ClientOptions;
    public user: User | null = null
    public shards: GatewayManager;

    /**
     * Create a client instace.
     * @param {string} token The Discord account token.
     * @param {object} options Client options.'
     */
    constructor(token: string, options?: ClientOptions) {
        super();

        this.#token = token;
        this.options = {
            gateway_version: options?.gateway_version || 9,
            first_shard_id: options?.first_shard_id || 0,
            last_shard_id: options?.last_shard_id && options.last_shard_id > 0 ? options.last_shard_id : null || options?.shards && options.shards > 1 ? (options?.shards || 0) - 1 : null || 0,
            shards: options?.shards && options.shards > 0 ? options.shards : null || ((options?.last_shard_id || 0) - (options?.first_shard_id || 0)) + 1 || 1,
            connectOneShardAtTime: options?.connectOneShardAtTime ?? true,
        }

        this.shards = new GatewayManager(this, this.#token);
    }

    /**
     * Connect the client to the Discord's gateway.
     * @returns {boolean} Returns true if 
     */
    public setup(): boolean {
        this.shards.setup();

        return true;
    }
}