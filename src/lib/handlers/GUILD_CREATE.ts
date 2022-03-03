import { Shard } from '@gateway/Shard';
import { Client } from '@client/Client';
import { Guild } from '@structures/Guild';

export default (client: Client, shard: Shard, d: any) => {
    d.shardID = shard.id;
    let guild = new Guild(d, client);
    client.cache.guilds.set(guild.id, guild);
    for(let member of guild.cache.members.values()) {
        client.cache.users.set(member.user.id, member.user);
    }
    if(client.ready) {
        client.emit('guildCreate', guild);
    }
}