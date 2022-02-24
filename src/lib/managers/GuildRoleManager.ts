import { Client } from "@client/Client";
import { Collection } from "@structures/Collection";
import { GuildRole } from "@structures/GuildRole";
import { ParseApiError } from "@utils/ParseApiError";

export class GuildRoleManager extends Collection<GuildRole> {
    public guild_id: string;
    #client: Client;

    public constructor(client: Client, guild_id: string, roles: Array<GuildRole> = []) {
        super(GuildRole);
        if(!client) throw new Error("Client is not valid.");
        if(!guild_id) throw new Error("Guild ID is not valid.");
        if(!roles) throw new Error("Roles are not valid.");

        if(!Array.isArray(roles)) {
            roles = [roles];
        }

        this.#client = client;
        this.guild_id = guild_id;

        for(let role of roles) {
            this.set(role.id, new GuildRole(role));
        }
    }

    public async fetch(id: string): Promise<GuildRole> {
        try {
            let res = await this.#client.rest.request({
                endpoint: `guilds/${this.guild_id}/roles/${id}`,
                method: 'get',
                authorization: true
            });

            return new GuildRole(res);
        } catch(_: any) {
            throw Error(ParseApiError(_));
        }
    }
}