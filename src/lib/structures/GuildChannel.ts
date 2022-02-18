import { TextChannel } from './TextChannel';
import { Client } from '@client/Client';
import { GuildChannelInterface } from "@interfaces";
import { Collection } from "./Collection";
import { User } from "./User";

/**
 * Represents a guild channel.
 * @extends TextChannel
 * @property {string} id The channel id.
 * @property {string} name The channel name.
 * @property {string} topic The channel topic.
 * @property {number|null} position The channel position.
 * @property {string} type The channel type
 * @property {boolean} nsfw Whether the channel is nsfw.
 * @property {string|null} last_message_id The last message id.
 * @property {number|null} bitrate The channel bitrate.
 * @property {number|null} user_limit The channel user limit.
 * @property {number|null} rate_limit_per_user The channel rate limit per user.
 * @property {Collection<User>} recipients The recipients of the channel.
 * @property {string|null} icon The channel icon.
 * @property {string|null} owner_id The channel owner id.
 * @property {string|null} application_id The channel application id.
 * @property {string|null} parent_id The channel parent id.
 * @property {number|null} last_pin_timestamp The last pin timestamp.
 * @property {string|null} rtc_region The channel rtc region.
 * @property {number|null} video_quality_mode The channel video quality mode.
 * @property {number|null} message_count The channel message count.
 * @property {number|null} member_count The channel member count.
 * @property {*} thread_metadata The channel thread metadata.
 * @property {*} member The member of the channel.
 * @property {number|null} default_auto_archive_duration The default auto archive duration.
 * @property {string|null} permissions The channel permissions.
 */
export class GuildChannel implements GuildChannelInterface {
    public id: string;
    public name: string;
    public type: string;
    public guild_id: string | null;
    public position: number | null;
    public permission_overwrites: Array<any> | [];
    public topic: string | null;
    public nsfw: boolean;
    public last_message_id: string | null;
    public bitrate: number | null;
    public recipients: Collection<User>;
    public user_limit: number | null;
    public rate_limit_per_user: number | null;
    public icon: string | null;
    public owner_id: string | null;
    public application_id: string | null;
    public parent_id: string | null;
    public last_pin_timestamp: number | null;
    public rtc_region: string | null;
    public video_quality_mode: number | null;
    public message_count: number | null;
    public member_count: number | null;
    public thread_metadata: any;
    public member: any;
    public default_auto_archive_duration: number | null;
    public permissions: string | null;
    #client: Client;

    /**
     * Create a new GuilldChannel instance.
     * @param {object} data The channel data.
     * @param {Client} client The client instance.
     */
    public constructor(data: any = {}, client: Client) {
        if (!data.id || !data.name || data.type === undefined) {
            throw new Error("Invalid guild channel data");
        }

        if (!client) {
            throw new Error("Invalid client");
        }

        this.#client = client;

        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.guild_id = data.guild_id || null;
        this.position = data.position || null;
        this.permission_overwrites = data.permission_overwrites || [];
        this.topic = data.topic || null;
        this.nsfw = data.nsfw || false;
        this.last_message_id = data.last_message_id || null;
        this.bitrate = data.bitrate || null;
        this.user_limit = data.user_limit || null;
        this.rate_limit_per_user = data.rate_limit_per_user || null;
        this.recipients = new Collection(User, Array.isArray(data.recipients) ? data.recipients.map((user: any) => new User(user)) : null);
        this.icon = data.icon || null;
        this.owner_id = data.owner_id || null;
        this.application_id = data.application_id || null;
        this.parent_id = data.parent_id || null;
        this.last_pin_timestamp = data.last_pin_timestamp ? new Date(data.last_pin_timestamp).getTime() : null;
        this.rtc_region = data.rtc_region || null;
        this.video_quality_mode = data.video_quality_mode || null;
        this.message_count = data.message_count || null;
        this.member_count = data.member_count || null;
        this.thread_metadata = data.thread_metadata || null;
        this.member = data.member || null;
        this.default_auto_archive_duration = data.default_auto_archive_duration || null;
        this.permissions = data.permissions || null;
    }
}