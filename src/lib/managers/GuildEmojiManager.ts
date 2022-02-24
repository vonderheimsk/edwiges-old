import { Client } from "@client/Client";
import { Collection } from "@structures/Collection";
import { GuildEmoji } from "@structures/GuildEmoji";
import { ParseApiError } from "@utils/ParseApiError";

export class GuildEmojiManager extends Collection<GuildEmoji> {
    public guild_id: string;
    #client: Client;

    public constructor(client: Client, guild_id: string, emojis: Array<GuildEmoji> = []) {
        super(GuildEmoji);
        if(!client) throw new Error("Client is not valid.");
        if(!guild_id) throw new Error("Guild ID is not valid.");

        if(!Array.isArray(emojis)) {
            emojis = [emojis];
        }

        this.#client = client;
        this.guild_id = guild_id;

        for(let emoji of emojis) {
            this.set(emoji.id, new GuildEmoji(emoji, guild_id, client));
        }
    }

    public async fetch(id: string): Promise<GuildEmoji> {
        try {
            let res = await this.#client.rest.request({
                endpoint: `guilds/${this.guild_id}/emojis/${id}`,
                method: 'get',
                authorization: true
            });

            return new GuildEmoji(res, this.guild_id, this.#client);
        } catch(_: any) {
            throw Error(ParseApiError(_));
        }
    }
}