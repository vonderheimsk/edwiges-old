import { Client } from "@client/Client";
import WS from 'ws';
let EventEmitter;

try {
    EventEmitter = require('eventemitter3');
} catch{
    EventEmitter = require('events');
}

/**
 * Represents a shard.
 * @extends EventEmitter
 * @property {number} id The shard's id.
 * @property {boolean} ready Whether the shard is ready.
 * @property {string} status The status of the shard.
 * @property {WS} gateway The websocket instance.
 * @property {number} last_heartbeat_send The last heartbeat sent.
 * @property {number} last_heartbeat_ack The last heartbeat ack.
 * @property {any} heartbeat_interval The heartbeat interval.
 * @property {number} seq The sequence number.
 * @property {number} session_id The session id.
 */
export class Shard extends EventEmitter {
    #client: Client;
    #token: string;
    public id: number;
    public gateway?: WS;
    public heartbeat_interval?: any;
    public session_id?: number;
    public seq: number = 0;
    public last_hearbeat_ack?: number;
    public last_heartbeat_send?: number;
    public status: string = 'disconnected';
    public ready: boolean = false;

    /**
     * Creates a new Shard instance
     * @param {Client} client The client instance
     * @param {string} token The token of the bot
     * @param {number} id The id of the shard
     */
    constructor(client: Client, token: string, id: number) {
        super();

        this.#client = client;
        this.#token = token;
        this.id = id;

        this.onMessage = this.onMessage.bind(this);
    }

    public _emit(event: string, ...args: Array<any>) {
        this.#client.emit(event, ...args);
    }

    /**
     * Connects to the gateway.
     */
    public async connect() {
        let ws = this.gateway = new WS(`${this.#client.gateway_url}/?v${this.#client.options.api_version}&encoding=json`);

        ws.onopen = this.onOpen;
        ws.onmessage = this.onMessage;
        ws.onclose = this.onClose;
    }
    
    /**
     * Called when the websocket is opened.
     * @param {WS.Event} payload The websocket event
     */
    public onOpen(payload: WS.Event) {
        this.emit('shardInitialized', this.id);
    }
    
    /**
     * Send a payload to the gateway.
     * @param {object} payload The payload to send
     */
    public sendPayload(payload: object) {
        this.gateway?.send(JSON.stringify(payload));
    }

    /**
     * Called when the websocket receives a message.
     * @param {WS.MessageEvent} payload The websocket event
     */
    public async onMessage(payload: WS.MessageEvent) {
        //@ts-ignore
        const { op, d, t, s } = JSON.parse(payload.data);

        if(s) {
            this.seq = s;
        }

        switch(op) {
            case 10:
                if(d.heartbeat_interval > 0) {
                    this.heartbeat_interval = setInterval(() => {
                        this.heartbeat();
                    }, d.heartbeat_interval);

                    this.identify();
                }
                break;

            case 11:
                this.last_hearbeat_ack = Date.now();
                break;

            case 0:
                this.onEvent({ t, d });
                break;

            case 9:
                this.seq = 0;
                this.session_id = undefined;
                this.identify();
                break;

            default:
                console.log(op, d, t, s);
                break;
        }
    }

    /**
     * Called when the websocket receives an event.
     * @param {object} event The event
     * @param {string} event.t The event type
     * @param {any} event.d The event data 
     */
    public async onEvent(event: { t: string, d: any }) {
        const { t, d } = event;

        try {
            let handler = await import(`./handlers/${t}`);
            handler.default(this.#client, this, d);
        } catch{}

    }

    /**
     * Identifies the client to the gateway.
     */
    public identify() {
        let obj = {
            token: this.#token,
            v: this.#client.options.api_version,
            compress: false,
            intents: 513,
            shard: (this.#client.options.last_shard_id || 0) > 0 ? [this.id, (this.#client.options.last_shard_id || 0) + 1] : undefined,
            properties: {
                $os: process.platform,
                $browser: 'Edwiges/1.0.0',
                $device: 'Edwiges/1.0.0',
            },
        }

        this.sendPayload({ op: 2, d: obj });
    }

    /**
     * Sends a heartbeat to the gateway.
     */
    public heartbeat() {
        this.last_heartbeat_send = Date.now();
        this.sendPayload({ op: 1, d: this.seq });
    }

    /**
     * Called when the websocket is closed.
     * @param {WS.CloseEvent} event The websocket event
     */
    public onClose(event: WS.CloseEvent) {
        console.log(event);
    }
}