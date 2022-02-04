import { RequestManager } from './../rest/RequestManager';
import { GatewayManager } from '../gateway/GatewayManager';
import { ClientOptions } from "../../interfaces";
import User from "../../interfaces/User";

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
 * @property {RequestManager} rest The request manager.
 */
export class Client extends EventEmitter {
    #token: string;
    public options: ClientOptions;
    public user: User | null = null;
    public shards: GatewayManager;
    public rest: RequestManager;
    public gateway_url?: string;

    /**
     * Create a client instace.
     * @param {string} token The Discord account token.
     * @param {object} options Client options.
     * @param {number} [options.gateway_version=9] The gateway version.
     * @param {number} [options.first_shard_id=0] The first shard id.
     * @param {number} [options.last_shard_id=0] The last shard id.
     * @param {number} [options.shards=1] The number of shards, set to 'auto' to use recommended number of shards.
     * @param {boolean} [options.connectOneShardAtTime=true] Connect one shard at time.
     */
    constructor(token: string, options?: ClientOptions) {
        super();

        this.#token = token;
        this.options = {
            api_version: options?.api_version || 9,
            first_shard_id: options?.first_shard_id || 0,
            last_shard_id: options?.last_shard_id && options.last_shard_id > 0 ? options.last_shard_id : null || options?.shards && options.shards > 1 ? (options?.shards || 0) - 1 : null || 0,
            shards: options?.shards && options.shards > 0 ? options.shards : null || ((options?.last_shard_id || 0) - (options?.first_shard_id || 0)) + 1 || 1,
            connectOneShardAtTime: options?.connectOneShardAtTime ?? true,
            alwaysSendAuthorizationOnRequest: options?.alwaysSendAuthorizationOnRequest ?? false,
        };

        this.shards = new GatewayManager(this, this.#token);
        this.rest = new RequestManager(this, this.#token, {
            api_version: this.options.api_version,
            alwaysSendAuthorization: this.options.alwaysSendAuthorizationOnRequest,
        });
    }

    /**
     * Connect the client to the Discord's gateway.
     */
    public async setup() {
        try {
            let res = await this.rest.request({ method: 'get', endpoint: 'gateway/bot', authorization: true });
            this.gateway_url = res.url;
            await this.shards.setup();
        } catch {
            throw new Error('Unable to connect to the gateway.');
        }
    }
}