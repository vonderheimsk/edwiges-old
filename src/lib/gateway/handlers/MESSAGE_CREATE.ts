import { Client } from "@client/Client";
import { Shard } from "@gateway/Shard";
import { Message } from "@structures/Message";

export default (client: Client, shard: Shard, d: any) => {
    client.emit('message', new Message(d, client));
}