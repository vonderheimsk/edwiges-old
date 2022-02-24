import { GuildRoleManager } from '@managers/GuildRoleManager';
import { User } from '@structures/User';

export default interface GuildEmojiInterface {
    id: string;
    name: string;
    roles: GuildRoleManager;
    user: User;
    require_colons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
}