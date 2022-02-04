import { Shard } from "../../..";
import { Client } from "../Client";

export default (client: Client, shard: Shard, d: any) => {
        shard.session_id = d.session_id;
        client.user = d.user;
        
        shard.status = 'ready';
        shard.ready = true;
        /**
         * Fires when the shard is ready.
         * @event Client#shardReady
         * @property {number} id The shard id
         */
        client.emit('shardReady', shard.id);

        /**
         * Fires when the client is ready.
         * @event Client#shardReady
         * @property {number} id The shard id
         */
        shard.emit('shardReady', shard.id);
};