import { Collection } from '@structures/Collection';

export default interface GuildChannelInterface {
    id: string;
    type: string;
    guild_id: string | null;
    name: string;
    position: number | null;
    permission_overwrites: Array<any> | [];
    topic: string | null;
    nsfw: boolean;
    last_message_id: string | null;
    bitrate: number | null;
    user_limit: number | null;
    rate_limit_per_user: number | null;
    recipients: Collection<any>;
    icon: string | null;
    owner_id: string | null;
    application_id: string | null;
    parent_id: string | null;
    last_pin_timestamp: number | null;
    rtc_region: string | null;
    video_quality_mode: number | null;
    message_count: number | null;
    member_count: number | null;
    thread_metadata: any;
    member: any;
    default_auto_archive_duration: number | null;
    permissions: string | null;
}