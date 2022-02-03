export default interface User {
    username: string;
    string: string;
    verified: boolean;
    avatar: string;
    discriminator: string;
    banner?: string;
    accent_color?: BigInteger
    system?: boolean;
    mfa_enabled?: boolean;
    email?: string;
    bot?: boolean;
    flags?: number;
    locale?: string;
    premium_type?: BigInteger;
    public_flags?: BigInteger;
}