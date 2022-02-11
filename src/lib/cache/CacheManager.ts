import { GuildChannel } from '@structures/GuildChannel';
import { Collection } from '@structures/Collection';
import { Client } from "@client/Client";
import { User } from '@structures/User';

export class CacheManager {
    public users: Collection<User>;
    public channels: Collection<GuildChannel>;
    #client: Client;

    public constructor(client: Client) {
        this.#client = client;

        this.users = new Collection(User);
        this.channels = new Collection(GuildChannel);

        this.setup();
    }

    public setup() {
        this.#client.rest.on('request', (data: any) => {
            if(data.request.method !== 'get') return;

            if(/(\/)?channels\/\d+/gm.test(data.request.endpoint)) {
                this.channels.set(data.body.id, new GuildChannel(data.body, this.#client));
            }
        })
    }
}