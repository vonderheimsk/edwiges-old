export default interface UserInterface {
    username: string;
    avatar: string;
    verified: boolean | null;
    discriminator: string;
    banner: string | null;
    accent_color: number | null;
    system: boolean | null;
    mfa_enabled: boolean;
    email: string | null;
    bot: boolean;
    flags: number | null;
    locale: string | null;
    premium_type: number | null;
    public_flags: number | null;
    createdTimestamp: number | null;
}