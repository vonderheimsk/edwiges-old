import { GuildChannel } from '@structures/GuildChannel';
import { TextChannel } from '@structures/TextChannel';
import { Collection } from '@structures/Collection';
import { MessageInterface } from "@interfaces";
import { User } from "@structures/User";
import { Client } from '@client/Client';
import { Guild } from '@structures/Guild';

/**
 * Represents a message.
 * @property {string} id The message id.
 * @property {string} channel_id The channel id.
 * @property {User} author The message author.
 * @property {string} content The message content.
 * @property {string} timestamp The message timestamp.
 * @property {string|null} edited_timestamp The message edited timestamp.
 * @property {boolean} tts Whether the message is tts.
 * @property {boolean} mention_everyone Whether the message mentions everyone.
 * @property {Collection<User>} mentions The message mentions.
 * @property {Collection<string>} mention_roles The message mention roles.
 * @property {Collection<GuildChannel>} mention_channels The message mention channels.
 * @property {Collection<string>} attachments The message attachments.
 * @property {Collection<*>} embeds The message embeds.
 * @property {Collection<*>} reactions The message reactions.
 * @property {string|null} nonce The message nonce.
 * @property {boolean} pinned Whether the message is pinned.
 * @property {string|null} webhook_id The message webhook id.
 * @property {string} type The message type.
 * @property {*} activity The message activity.
 * @property {*} application The message application.
 * @property {*} message_reference The message message reference.
 * @property {string|null} application_id The message application id.
 * @property {number|null} flags The message flags.
 * @property {*} thread The message thread.
 * @property {*} components The message components.
 * @property {*} interaction The message interaction.
 * @property {*} stickers The message stickers.
 * @property {Collection<*>} sticker_items The message sticker items.
 * @property {string} guild_id The guild id.
 * @property {GuildChannel|TextChannel} channel The channel.
 */
export class Message implements MessageInterface {
    public id: string;
    public channel_id: string;
    public author: User;
    public content: string;
    public timestamp: number;
    public edited_timestamp: number | null;
    public tts: boolean;
    public mention_everyone: boolean;
    public mentions: Collection<User>;
    public mention_roles: Collection<string>;
    public mention_channels: Collection<GuildChannel>;
    public attachments: Collection<string>;
    public embeds: Collection<any>;
    public reactions: Collection<any>;
    public nonce: string | null;
    public pinned: boolean;
    public webhook_id: string | null;
    public type: string;
    public activity: any;
    public application: any;
    public message_reference: any;
    public application_id: string | null;
    public flags: number | null;
    public thread: any;
    public components: any;
    public interaction: any;
    public stickers: any;
    public sticker_items: Collection<any>;
    public channel: TextChannel;
    public guild_id: string | null;
    public guild: Guild | null;
    #client: Client;

    /**
     * Create a new Message instance.
     * @param data The message data.
     * @param client The client instance.
     */
    public constructor(data: any = {}, client: Client) {
        if(!data.id || !data.channel_id || !data.content || !data.author || !data.timestamp) {
            throw new Error('Invalid message data');
        }

        if(!client) {
            throw new Error('Invalid client');
        }

        this.#client = client;

        this.id = data.id;
        this.channel_id = data.channel_id;
        this.author = new User(data.author);
        this.guild_id = data.guild_id || null;
        this.guild = this.#client.cache.guilds.get(this.guild_id) || null;

        //@ts-ignore
        this.channel =  this.guild?.cache.channels.get(this.channel_id) || this.guild?.threads.get(this.channel_id) || null;
        if(!this.channel) {
            this.#client.rest.request({
                endpoint: `/channels/${this.channel_id}`,
                method: 'get',
                authorization: true
            }).then((res: any) => this.channel = new TextChannel(res, this.#client));
        }
        this.content = data.content;
        this.timestamp = new Date(data.timestamp).getTime() || 0;
        this.edited_timestamp = data.edited_timestamp || null;
        this.tts = data.tts || false;
        this.mention_everyone = data.mention_everyone || false;
        this.mentions = new Collection(User, Array.isArray(data.mentions) ? data.mentions.map((mention: any) => new User(mention)) : null);
        this.mention_roles = new Collection(String, data.mention_roles);
        this.mention_channels = new Collection(String, data.mention_channels);
        this.attachments = new Collection(String, data.attachments);
        this.embeds = new Collection(Object, data.embeds);
        this.reactions = new Collection(Object, data.reactions);
        this.nonce = data.nonce || null;
        this.pinned = data.pinned || false;
        this.webhook_id = data.webhook_id || null;
        this.type = data.type || "DEFAULT";
        this.activity = data.activity || null;
        this.application = data.application || null;
        this.application_id = data.application_id || null;
        this.flags = data.flags || null;
        this.message_reference = data.message_reference || null;
        this.thread = data.thread || null;
        this.components = data.components || null;
        this.interaction = data.interaction || null;
        this.stickers = data.stickers || null;
        this.sticker_items = data.sticker_items || null;
    }
}