import { GuildChannel } from '@structures/GuildChannel';
import { Collection } from '@structures/Collection';
import { User } from "@structures/User";

export default interface MessageInterface {
    id: string;
    channel_id: string;
    content: string;
    timestamp: number;
    edited_timestamp: number | null;
    tts: boolean;
    mention_everyone: boolean;
    mentions: Collection<User> | [];
    mention_roles: Collection<string> | [];
    mention_channels: Collection<GuildChannel>;
    attachments: Collection<string> | [];
    embeds: Collection<any> | [];
    reactions: Collection<any> | [];
    nonce: string | null;
    pinned: boolean;
    webhook_id: string | null;
    type: string;
    activity: any;
    application: any;
    message_reference: any;
    application_id: string | null;
    flags: number | null;
    thread: any;
    components: any;
    interaction: any;
    stickers: any;
    sticker_items: Collection<any> | null;
}