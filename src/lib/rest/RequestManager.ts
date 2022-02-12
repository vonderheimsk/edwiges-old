import { Client } from '@client/Client';
import { request, RequestOptions as ReqOptions } from "https";
import RequestManagerOptions from '@interfaces/RequestManagerOptions';
let EventEmitter;

try {
    EventEmitter = require('eventemitter3');
} catch {
    EventEmitter = require('events');
}

export interface RequestOptions {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    endpoint: string;
    authorization?: boolean;
    data?: any;
    headers?: any;
}

/**
 * Represents a request manager.
 * @property {RequestManagerOptions} options The request options.
 */
export class RequestManager extends EventEmitter {
    #client: Client;
    #token: string;
    public options: RequestManagerOptions;

    /**
     * Creates a RequestManager instance.
     * @param {Client} client The client's object. 
     * @param {string} token The client's token.
     * @param {RequestManagerOptions} options The request manager options.
     * @param {number} [options.api_version=9] The API version.
     * @param {boolean} [options.alwaysSendAuthorization=false] Whether to always send authorization headers.
     */
    public constructor(client: Client, token: string, options?: RequestManagerOptions) {
        super()
        this.#client = client;
        this.#token = token;

        if(options?.api_version && ![6, 7, 8, 9].includes(options.api_version)) {
            throw new Error('Api version must be 6, 7, 8 or 9');
        }

        this.options = {
            api_version: options?.api_version || 9,
            alwaysSendAuthorization: options?.alwaysSendAuthorization || false,
        };
    }

    /**
     * Make a request.
     * @param {RequestOptions} options The request options. 
     * @param {string} options.method The request method.
     * @param {string} options.endpoint The request endpoint.
     * @param {boolean} [options.authorization] Whether to send authorization headers.
     * @param {any} [options.data] The request data.
     * @param {any} [options.headers] The request headers.
     * @returns {Promise<any>} The request promise with the response.
     */
    public request(options: RequestOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpMethods = {
                get: 'GET',
                post: 'POST',
                patch: 'PATCH',
                put: 'PUT',
                delete: 'DELETE'
            }
    
            if (!options.method || !options.endpoint) {
                reject('Missing method or endpoint');
            }

            if (!httpMethods[options.method]) {
                reject('Invalid method');
            }

            if (typeof options.endpoint !== 'string') {
                reject('Invalid endpoint');
            }

            if (options.endpoint.startsWith('/')) {
                options.endpoint = options.endpoint.substring(1);
            }
    
            const requestOptions: ReqOptions = {
                host: 'discord.com',
                path: `/api/v${this.options.api_version}/${options.endpoint}`,
                method: httpMethods[options.method],
                headers: {
                    'Authorization': `${options.authorization ? `Bot ${this.#token}` : this.options.alwaysSendAuthorization ? `Bot ${this.#token}` : ''}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Edwiges/1.0.0',
                    ...options.headers,
                }
            };
            
            try {
                let req = request(requestOptions, (response) => {
                    let body: any = '';
                    response.setEncoding('utf8');

                    response.on('data', (chunk) => {
                        body += chunk;
                    });

                    response.on('end', () => {
                        if (response.statusCode === 200) {
                            resolve(JSON.parse(body));
                        } else {
                            reject(`${response.statusCode}: ${body}`);
                        }

                        this.emit('request', {
                            response,
                            body: JSON.parse(body),
                            request: options
                        });
                    });
                });

                if(options.data) {
                    req.write(JSON.stringify(options.data));
                }
                req.end();
            } catch (error) {
                reject(error);
            }
        });
    }
}