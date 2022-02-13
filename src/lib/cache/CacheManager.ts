import { Collection } from '@structures/Collection';
import { Client } from "@client/Client";
import { User } from '@structures/User';
import { Guild } from '@structures/Guild';
import { GuildChannel } from '@structures/GuildChannel';

/**
 * Represents a cache manager.
 * @property {Collection<User>} users The users cache.
 * @property {Collection<Guild>} guilds The guilds cache.
 */
export class CacheManager {
    public users: Collection<User>;
    public guilds: Collection<Guild>;
    #client: Client;

    /**
     * Creates a new cache manager.
     * @param client The client.
     */
    public constructor(client: Client) {
        this.#client = client;

        this.users = new Collection(User);
        this.guilds = new Collection(Guild);
        this.setup();
    }

    /**
     * Sets up the cache manager.
     */
    public setup() {
        this.#client.rest.on('request', (data: any) => {
            if(data.request.method !== 'get') return;

            if(/(\/)?channels\/\d+/gm.test(data.request.endpoint)) {
                let guild = this.guilds.get(data.body.guild_id);
                guild?.channels.set(data.body.id, new GuildChannel(data.body, this.#client));
            }
        })
    }
}