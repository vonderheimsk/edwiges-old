import { TextChannel } from '@structures/TextChannel';
import { Collection } from '@structures/Collection';
import { Client } from "@client/Client";
import { User } from '@structures/User';
import { GuildManager } from '@managers/GuildManager';

/**
 * Represents a cache manager.
 * @property {Collection<User>} users The users cache.
 * @property {Collection<Guild>} guilds The guilds cache.
 */
export class CacheManager {
    public users: Collection<User>;
    public guilds: GuildManager;
    #client: Client;

    /**
     * Creates a new cache manager.
     * @param client The client.
     */
    public constructor(client: Client) {
        this.#client = client;

        this.users = new Collection(User);
        this.guilds = new GuildManager(client);
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
                guild?.channels.set(data.body.id, new TextChannel(data.body, this.#client));
            }
        })
    }
}