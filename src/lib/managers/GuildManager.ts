import { Guild } from '@structures/Guild';
import { Client } from "@client/Client";
import { Collection } from "@structures/Collection";
import { ParseApiError } from "@utils/ParseApiError";

export class GuildManager extends Collection<Guild> {
    #client: Client;

    public constructor(client: Client, guilds: Array<Guild> = []) {
        super(Guild);
        if(!client) throw new Error("Client is not valid.");
        if(!guilds) throw new Error("Guilds are not valid.");

        if(!Array.isArray(guilds)) {
            guilds = [guilds];
        }

        this.#client = client;

        for(let guild of guilds) {
            this.set(guild.id, new Guild(guild, this.#client));
        }
    }

    public async fetch(id: string): Promise<Guild> {
        try {
            let res = await this.#client.rest.request({
                endpoint: `guilds/${id}`,
                method: 'get',
                authorization: true
            });

            return new Guild(res, this.#client);
        } catch(_: any) {
            throw Error(ParseApiError(_));
        }
    }
}