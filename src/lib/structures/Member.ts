import { MemberInterface } from "@interfaces";
import { Collection } from "@structures/Collection";
import { User } from "@structures/User";

/**
 * Represents a member.
 * @property {User} user The member user.
 * @property {string} nickname The member nickname.
 * @property {boolean} deaf Whether the member is deafened.
 * @property {boolean} mute Whether the member is muted.
 * @property {Collection<string>} roles The member roles.
 * @property {number} joined_at The member joined at timestamp.
 * @property {number|null} comunication_disabled_until The member communication disabled until timestamp.
 * @property {boolean} pending Whether the member is pending.
 * @property {*} permissions The member permissions.
 * @property {number} premium_since The member premium since timestamp.
 */
export class Member implements MemberInterface {
    public user: User;
    public deaf: boolean;
    public mute: boolean;
    public joined_at: number;
    public roles: Collection<string>;
    public nickname: string | null;
    public comunication_disabled_until: number | null;
    public pending: boolean;
    public permissions: any;
    public premium_since: number;

    /**
     * Create a new Member instance.
     * @param data The member data.
     */
    public constructor(data: any = {}) {
        if (!data) {
            throw new Error("Invalid data");
        }

        this.user = new User(data.user);
        this.deaf = data.deaf || false;
        this.mute = data.mute || false;
        this.joined_at = new Date(data.joined_at).getTime();
        this.roles = new Collection(String, data.roles);
        this.nickname = data.nick || null;
        this.comunication_disabled_until = data.comunication_disabled_until || null;
        this.pending = data.pending || false;
        this.permissions = data.permissions || null;
        this.premium_since = data.premium_since || null;
    }
}