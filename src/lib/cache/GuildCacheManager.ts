import { GuildEmojiManager } from '@managers/GuildEmojiManager';
import { GuildRoleManager } from '@managers/GuildRoleManager';
import { GuildMemberManager } from '@managers/GuildMemberManager';
import { Client } from '@client/Client';
import { GuildChannelManager } from '@managers/GuildChannelManager';
import { Guild } from '@structures/Guild';

export class GuildCacheManager {
    public channels: GuildChannelManager;
    public members: GuildMemberManager;
    public roles: GuildRoleManager;
    public emojis: GuildEmojiManager;

    public constructor(guild: Guild, rawData: any, client: Client) {
        this.channels = new GuildChannelManager(client, guild.id, rawData.channels);
        this.members = new GuildMemberManager(client, guild.id, rawData.members);
        this.roles = new GuildRoleManager(client, guild.id, rawData.roles);
        this.emojis = new GuildEmojiManager(client, guild.id, rawData.emojis);
    }
}