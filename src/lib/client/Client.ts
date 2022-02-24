import { CacheManager } from './../cache/CacheManager';
import { RequestManager } from '@rest/RequestManager';
import { GatewayManager } from '@gateway/GatewayManager';
import { ClientOptions, UserInterface } from "@interfaces";
import { User } from '@structures/User';

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
 * @property {CacheManager} cache The cache manager.
 * @property {number} ping The client's ping.
 */
export class Client extends EventEmitter {
    #token: string;
    public options: ClientOptions;
    public user: User | null;
    public shards: GatewayManager;
    public rest: RequestManager;
    public gateway_url: string | null = null;
    public cache: CacheManager;


    /**
     * Create a client instace.
     * @param {string} token The Discord account token.
     * @param {object} options Client options.
     * @param {number} [options.gateway_version=9] The gateway version.
     * @param {number} [options.first_shard_id=0] The first shard id.
     * @param {number} [options.last_shard_id=0] The last shard id.
     * @param {string} [options.shards=1] The number of shards, set it to 'auto' to use recommended number of shards.
     * @param {boolean} [options.connectOneShardAtTime=true] Connect one shard at time.
     */
    constructor(token: string, options: ClientOptions = {}) {
        super();

        this.#token = token;

        if(options.rest?.api_version && ![6, 7, 8, 9].includes(options.rest.api_version)) {
            throw Error('Api version must be 6, 7, 8, or 9');
        }

        if(options.sharding?.first_shard_id && typeof options.sharding.first_shard_id !== 'number') {
            throw new TypeError('options.sharding.first_shard_id must be a number');
        }
        if(options.sharding?.last_shard_id && typeof options.sharding.last_shard_id !== 'number') {
            throw new TypeError('options.sharding.last_shard_id must be a number');
        }

        if(options.sharding?.first_shard_id !== undefined && options.sharding.last_shard_id !== undefined) {
            if(options.sharding?.first_shard_id > options.sharding?.last_shard_id) {
                throw new RangeError('options.sharding.first_shard_id must be lower than options.sharding.last_shard_id');
            }
        }

        if(options.sharding && options.sharding?.totalShards && typeof options.sharding.totalShards !== 'number' && options.sharding.totalShards !== 'auto') {
            throw new TypeError('options.sharding.totalShards must be a number or \'auto\'');
        }
        
        if(options.sharding?.connectOneShardAtTime && typeof options.sharding.connectOneShardAtTime !== 'boolean') {
            throw new TypeError('options.sharding.connectOneShardAtTime must be a boolean');
        }

        if(options.rest?.alwaysSendAuthorizationOnRequest && typeof options.rest.alwaysSendAuthorizationOnRequest !== 'boolean') {
            throw new TypeError('options.alwaysSendAuthorizationOnRequest must be a boolean');
        }

        this.options = {
            intents: options?.intents || 515,
            rest: {
                api_version: options?.rest?.api_version || 9,
                alwaysSendAuthorizationOnRequest: options?.rest?.alwaysSendAuthorizationOnRequest ?? false,
            },
            sharding: {
                first_shard_id: options?.sharding?.first_shard_id || 0,
                last_shard_id: options?.sharding?.last_shard_id && options.sharding.last_shard_id > 0 ? options.sharding.last_shard_id : null || options?.sharding?.totalShards && options.sharding.totalShards > 1 ? (typeof options?.sharding?.totalShards === 'number' ? options?.sharding?.totalShards : null || 0) - 1 : null || 0,
                totalShards: options?.sharding?.totalShards && (options.sharding.totalShards > 0 || typeof options.sharding.totalShards === 'number') ? options.sharding.totalShards : null || ((options?.sharding?.last_shard_id || 0) - (options?.sharding?.first_shard_id || 0)) + 1 || 1,
                connectOneShardAtTime: options?.sharding?.connectOneShardAtTime ?? true,
            }
            
        };

        this.ready = false;
        this.user = null;
        this.shards = new GatewayManager(this, this.#token);
        this.rest = new RequestManager(this, this.#token, this.options.rest);
        this.cache = new CacheManager(this);
    }

    /**
     * Connect the client to the Discord's gateway.
     */
    public async setup() {
        try {
            let res = await this.rest.request({ method: 'get', endpoint: 'gateway/bot', authorization: true });
            this.gateway_url = res.url;
            if(this.options?.sharding?.totalShards === 'auto') {
                this.options.sharding.totalShards = res.shards;
                this.options.sharding.first_shard_id = 0;
                this.options.sharding.last_shard_id = res.shards - 1;
            }
            await this.shards.setup();
        } catch {
            throw new Error('Unable to connect to the gateway.');
        }
    }
}