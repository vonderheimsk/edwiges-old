import { Client } from "@client/Client";
import { Collection } from "@structures/Collection";
import { Member } from "@structures/Member";
import { ParseApiError } from "@utils/ParseApiError";

export class MemberManager extends Collection<Member> {
    public guild_id: string;
    #client: Client;

    public constructor(client: Client, members: Array<Member>, guild_id: string) {
        super(Member);
        if(!client) throw new Error("Client is not valid.");
        if(!guild_id) throw new Error("Guild ID is not valid.");
        if(!members) throw new Error("Members are not valid.");

        if(!Array.isArray(members)) {
            members = [members];
        }

        this.#client = client;
        this.guild_id = guild_id;

        for(let member of members) {
            this.set(member.user.id, new Member(member));
        }
    }

    public async fetch(id: string): Promise<Member> {
        try {
            let res = await this.#client.rest.request({
                endpoint: `guilds/${this.guild_id}/members/${id}`,
                method: 'get',
                authorization: true
            });

            return new Member(res);
        } catch(_: any) {
            throw Error(ParseApiError(_));
        }
    }
}