export default interface GuildRoleInterface {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon: string | null;
    unicode_emoji: string | null;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags: Array<any>;
}