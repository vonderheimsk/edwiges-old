import { Collection } from '@structures/Collection';
import { User } from "@structures/User";

export default interface MemberInterface {
    user: User;
    nickname: string | null;
    deaf: boolean;
    mute: boolean;
    joined_at: number;
    roles: Collection<string>;
    premium_since: number;
    pending: boolean;
    permissions: any;
    comunication_disabled_until: number | null;
}