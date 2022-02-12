import { Shard } from '@gateway/Shard';
import { Client } from '@client/Client';
import { Guild } from '@structures/Guild';

export default (client: Client, shard: Shard, d: any) => {
    let guild = new Guild(d, client);
    console.log(`[Shard ${shard.id}] Guild ${guild.id} (${guild.name}) created`);
    client.cache.guilds.set(guild.id, guild);
    client.emit('guildCreate', guild);
}