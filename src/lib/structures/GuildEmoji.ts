import { Client } from '@client/Client';
import { GuildRoleManager } from '@managers/GuildRoleManager';
import { GuildEmojiInterface } from "src";
import { User } from '.';

/**
 * @class GuildEmoji
 * @implements {GuildEmojiInterface}
 * @property {string} id The ID of the emoji.
 * @property {string} name The name of the emoji.
 * @property {GuildRoleManager} roles The roles allowed to use the emoji.
 * @property {User} user The user that created the emoji.
 * @property {boolean} require_colons Whether the emoji requires colons.
 * @property {boolean} managed Whether the emoji is managed.
 * @property {boolean} animated Whether the emoji is animated.
 * @property {boolean} available Whether the emoji is available.
 */
export class GuildEmoji implements GuildEmojiInterface {
    public id: string;
    public name: string;
    public require_colons: boolean;
    public roles: GuildRoleManager;
    public user: User | null;
    public available: boolean;
    public managed: boolean;
    public animated: boolean;
    public guild_id: string;
    #client: Client;

    /**
     * Create a new GuildEmoji instance.
     * @param data The data of the emoji.
     * @param guild_id The ID of the guild.
     * @param client The client instance.
     */
    public constructor(data: any = {}, guild_id: string, client: Client) {
        if(!data) throw new Error("Data is required.");
        if(typeof data !== 'object') throw new TypeError(`Expected Object, but got ${typeof data}`);
        if(!client) throw new Error("Client required.");
        if(!guild_id) throw new Error("Guild ID is required.");

        this.#client = client;
        this.guild_id = guild_id;
        this.id = data.id;
        this.name = data.name;
        this.animated = data.animated || false;
        this.managed = data.managed || false;
        this.require_colons = data.require_colons || false;
        this.roles = new GuildRoleManager(client, guild_id, data.roles);
        this.user = data.user ? new User(data.user) : null;
        this.available = data.available || false;
    }
}