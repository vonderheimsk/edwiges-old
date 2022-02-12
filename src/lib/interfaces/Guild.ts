import { GuildChannel } from '@structures/GuildChannel';
import { Collection } from '@structures/Collection';

export default interface GuildInterface {
    id: string;
    name: string;
    icon: string;
    splash: string;
    owner_id: string;
    permissions: number | null;
    region: string | null;
    afk_channel_id: string;
    afk_timeout: number;
    widget_enabled: boolean | false;
    widget_channel_id: string | null;
    verification_level: number;
    default_message_notifications: number | null;
    roles: Collection<any>;
    emojis: Collection<any>;
    features: Array<any>;
    mfa_level: number;
    icon_hash: string | null;
    application_id: string | null;
    system_channel_id: string | null;
    system_channel_flags: number | null;
    rules_channel_id: string | null;
    joinedTimestamp: number;
    large: boolean;
    unavailable: boolean;
    member_count: number | 0;
    voice_states: Array<any> | [];
    members: Collection<any>;
    channels: Collection<GuildChannel>;
    threads: Collection<any>;
    presences: Collection<any>;
    max_presences: number | 0;
    max_members: number | 0;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: number | null;
    premium_subscription_count: number | null;
    preferred_locale: string | null;
    public_updates_channel_id: string | null;
    max_video_channel_users: number | null;
    approximate_member_count: number | null;
    approximate_presence_count: number | null;
    welcome_screen: any | null;
    nsfw_level: number;
    stage_instances: Array<any> | [];
    stickers: Array<any> | [];
    guild_scheduled_events: Array<any> | [];
    premium_progress_bar_enabled: boolean | false;
}