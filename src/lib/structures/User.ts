import { UserInterface } from '@interfaces'

/**
 * Represents a user.
 * @property {string} id The user's id.
 * @property {string} username The user's username.
 * @property {string} discriminator The user's discriminator.
 * @property {string} avatar The user's avatar.
 * @property {string|null} avatar_url The user's avatar url.
 * @property {boolean} bot Whether the user is a bot.
 * @property {string|null} email The user's email.
 * @property {boolean} mfa_enabled Whether the user has 2fa enabled.
 * @property {string|null} locale The user's locale.
 * @property {number|null} flags The user's flags.
 * @property {number|null} premium_type The user's premium type.
 * @property {number|null} public_flags The user's public flags.
 * @property {number|null} createdTimestamp The user's created timestamp.
 * @property {string|null} note The user's note.
 * @property {string|null} banner The user's banner.
 * @property {number|null} accent_color The user's accent color.
 */
export class User implements UserInterface {
    public id: string;
    public username: string;
    public avatar: string;
    public discriminator: string;
    public bot: boolean;
    public system: boolean | null;
    public mfa_enabled: boolean;
    public locale: string | null;
    public verified: boolean | null;
    public email: string | null;
    public flags: number | null;
    public premium_type: number | null;
    public public_flags: number | null;
    public premium_since: string | null;
    public createdTimestamp: number | null;
    public note: string | null;
    public avatar_url: string | null;
    public banner: string | null;
    public accent_color: number | null;

    /**
     * Create a new User instance.
     * @param data The user data.
     */
    public constructor(data: any = {}) {
        if(!data.id || !data.username || !data.discriminator || !data.avatar) {
            throw new Error('Invalid user data');
        }

        this.id = data.id;
        this.username = data.username;
        this.avatar = data.avatar;
        this.discriminator = data.discriminator;
        this.bot = data.bot || false;
        this.system = data.system || false;
        this.mfa_enabled = data.mfa_enabled || false;
        this.locale = data.locale || null;
        this.verified = data.verified || false;
        this.email = data.email || null;
        this.flags = data.flags || null;
        this.premium_type = data.premium_type || null;
        this.public_flags = data.public_flags || null;
        this.premium_since = data.premium_since || null;
        this.createdTimestamp = new Date(data.created_at).getTime() || null;
        this.note = data.note || null;
        this.avatar_url = data.avatar_url || null;
        this.banner = data.banner || null;
        this.accent_color = data.accent_color || null;
    }
}