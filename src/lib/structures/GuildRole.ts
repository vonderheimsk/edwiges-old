import { GuildRoleInterface } from "@interfaces";

/**
 * @class GuildRole
 * @implements {GuildRoleInterface}
 * @property {string} id The ID of the role.
 * @property {string} name The name of the role.
 * @property {number} color The color of the role.
 * @property {boolean} hoist Whether the role is hoisted.
 * @property {string | null} icon The icon of the role.
 * @property {string | null} unicode_emoji The unicode emoji of the role.
 * @property {number} position The position of the role.
 * @property {string} permissions The permissions of the role.
 * @property {boolean} managed Wheter the role can be managed.
 * @property {boolean} mentionable Whether the role is mentionable.
 */
export class GuildRole implements GuildRoleInterface {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon: string | null;
    unicode_emoji: string | null;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags: Array<any>;

    /**
     * Create a new GuildRole instance.
     * @param data The data of the role.
     */
    public constructor(data: any = {}) {
        if(!data || !data.id || !data.name) throw new Error('GuildRole: Missing id or name');
        if(typeof data !== 'object') throw new TypeError(`Expected Object, but got ${typeof data}`);

        this.id = data.id;
        this.name = data.name;
        this.color = data.color || 0;
        this.hoist = data.hoist || false;
        this.icon = data.icon || null;
        this.unicode_emoji = data.unicode_emoji || null;
        this.position = data.position || 0;
        this.permissions = data.permissions || '';
        this.managed = data.managed || false;
        this.mentionable = data.mentionable || false;
        this.tags = data.tags || [];
    }
}