import { ChannelManager } from './../managers/ChannelManager';
import { TextChannel } from '@structures/TextChannel';
import { Collection } from '@structures/Collection';
import { Client } from '@client/Client';
import { GuildInterface } from "@interfaces";
import { Member } from '@structures/Member';
import { MemberManager } from '@managers/MemberManager';

/**
 * Represents a Guild
 * @property {string} id The guild id.
 * @property {string} name The guild name.
 * @property {string} icon The guild icon.
 * @property {string|null} icon_hash The guild icon hash.
 * @property {string} splash The guild splash.
 * @property {string} owner_id The guild owner id.
 * @property {Collection<TextChannel>} channels The guild channels.
 * @property {number} member_count The guild member count.
 * @property {number} max_members The guild max members.
 * @property {Collection<*>} members The guild members.
 * @property {Collection<*>} roles The guild roles.
 * @property {Collection<*>} emojis The guild emojis.
 * @property {Collection<*>} presences The guild presences.
 * @property {number|null} max_video_channel_users The guild max video channel users.
 * @property {number} mfa_level The guild mfa level.
 * @property {string} afk_channel_id The guild afk channel id.
 * @property {number} afk_timeout The guild afk timeout.
 * @property {string|null} application_id The guild application id.
 * @property {number|null} approximate_member_count The guild approximate member count.
 * @property {number|null} approximate_presence_count The guild approximate presence count.
 * @property {*} welcome_screen The guild welcome screen.
 * @property {string|null} widget_channel_id The guild widget channel id.
 * @property {boolean} widget_enabled The guild widget enabled.
 * @property {string|null} region The guild region.
 * @property {string|null} rules_channel_id The guild rules channel id.
 * @property {Collection<TextChannel>} threads The guild threads.
 * @property {boolean} unavailable Whether the guild is unavailable or not.
 * @property {number|null} permissions The guild permissions.
 * @property {string|null} preferred_locale The guild preferred locale.
 * @property {boolean} premium_progress_bar_enabled Whether the guild premium progress bar is enabled or not.
 * @property {number|null} premium_subscription_count The guild premium subscription count.
 * @property {number|null} premium_tier The guild premium tier.
 * @property {string|null} public_updates_channel_id The guild public updates channel id.
 * @property {*[]} stage_instances The guild stage instances.
 * @property {*[]} stickers The guild stickers.
 * @property {number|null} system_channel_flags The guild system channel flags.
 * @property {string|null} system_channel_id The guild system channel id.
 * @property {number|null} default_message_notifications The guild default message notifications.
 * @property {string|null} description The guild description.
 * @property {*[]} features The guild features.
 * @property {*[]} guild_scheduled_events The guild scheduled events.
 * @property {number|null} joinedTimestamp The client joined timestamp.
 * @property {boolean} large Whether the guild is large or not.
 * @property {string|null} vanity_url_code The guild vanity url code.
 * @property {number|null} verification_level The guild verification level.
 * @property {string|null} banner The guild banner.
 * @property {*[]} voice_states The guild voice states.
 */
export class Guild implements GuildInterface {
    public id: string;
    public name: string;
    public icon: string;
    public icon_hash: string | null;
    public owner_id: string;
    public channels: Collection<TextChannel>;
    public member_count: number | null;
    public max_members: number | null;
    public max_presences: number | null;
    public max_video_channel_users: number | null;
    public members: Collection<any>;
    public mfa_level: number;
    public afk_channel_id: string;
    public afk_timeout: number;
    public application_id: string | null;
    public approximate_member_count: number | null;
    public approximate_presence_count: number | null;
    public emojis: Collection<any>;
    public welcome_screen: any;
    public widget_channel_id: string | null;
    public widget_enabled: boolean;
    public region: string | null;
    public roles: Collection<any>;
    public rules_channel_id: string | null;
    public splash: string;
    public threads: Collection<TextChannel>;
    public unavailable: boolean;
    public permissions: number | null;
    public preferred_locale: string | null;
    public premium_progress_bar_enabled: boolean;
    public premium_subscription_count: number | null;
    public premium_tier: number | null;
    public presences: Collection<any>;
    public public_updates_channel_id: string | null;
    public stage_instances: any[];
    public stickers: any[];
    public system_channel_flags: number | null;
    public system_channel_id: string | null;
    public default_message_notifications: number | null;
    public description: string | null;
    public features: any[];
    public guild_scheduled_events: any[];
    public joinedTimestamp: number;
    public large: boolean;
    public vanity_url_code: string | null;
    public verification_level: number;
    public voice_states: any[];
    public banner: string | null;
    public nsfw_level: number;
    public shardID: number;
    #client: Client

    /**
     * Create a new Guild instance.
     * @param {object} data The guild data.
     * @param {Client} client The client instance.
     */
    public constructor(data: any = {}, client: Client) {
        if (!data.id || !data.name) {
            throw new Error("Invalid guild data");
        }

        if (!client) {
            throw new Error("Invalid client");
        }

        this.#client = client;
        
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.shardID = data.shardID || 0;
        this.icon_hash = data.icon_hash || null;
        this.owner_id = data.owner_id;
        this.channels = new ChannelManager(this.#client, this.id, data.channels);
        this.member_count = data.member_count;
        this.max_members = data.max_members || null;
        this.max_presences = data.max_presences || null;
        this.max_video_channel_users = data.max_video_channel_users || null;
        this.members = new MemberManager(this.#client, this.id, data.members);
        this.mfa_level = data.mfa_level;
        this.afk_channel_id = data.afk_channel_id || null;
        this.afk_timeout = data.afk_timeout || null;
        this.application_id = data.application_id || null;
        this.approximate_member_count = data.approximate_member_count || null;
        this.approximate_presence_count = data.approximate_presence_count || null;
        this.emojis = new Collection(Object, data.emojis);
        this.welcome_screen = data.welcome_screen || null;
        this.widget_channel_id = data.widget_channel_id || null;
        this.widget_enabled = data.widget_enabled || false;
        this.region = data.region || null;
        this.roles = new Collection(Object, data.roles);
        this.rules_channel_id = data.rules_channel_id || null;
        this.splash = data.splash;
        this.threads = new Collection(TextChannel, Array.isArray(data.threads) ? data.threads.map((channel: any) => new TextChannel(channel, this.#client)) : data.threads);
        this.unavailable = data.unavailable || false;
        this.permissions = data.permissions || null;
        this.preferred_locale = data.preferred_locale || null;
        this.premium_progress_bar_enabled = data.premium_progress_bar_enabled;
        this.premium_subscription_count = data.premium_subscription_count || null;
        this.premium_tier = data.premium_tier || null;
        this.presences = new Collection(Object, data.presences);
        this.public_updates_channel_id = data.public_updates_channel_id || null;
        this.stage_instances = data.stage_instances;
        this.stickers = data.stickers;
        this.system_channel_flags = data.system_channel_flags || null;
        this.system_channel_id = data.system_channel_id || null;
        this.default_message_notifications = data.default_message_notifications || null;
        this.description = data.description || null;
        this.features = data.features || [];
        this.guild_scheduled_events = data.guild_scheduled_events || [];
        this.joinedTimestamp = data.joined_at ? new Date(data.joined_at).getTime() : new Date().getTime();
        this.large = data.large || false;
        this.vanity_url_code = data.vanity_url_code || null;
        this.verification_level = data.verification_level;
        this.voice_states = data.voice_states;
        this.banner = data.banner || null;
        this.nsfw_level = data.nsfw_level;
    }
}