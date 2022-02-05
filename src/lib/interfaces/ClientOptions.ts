export default interface ClientOptions {
    api_version?: 6 | 7 | 8 | 9;
    first_shard_id?: number;
    last_shard_id?: number;
    shards?: number | 'auto';
    connectOneShardAtTime?: boolean;
    alwaysSendAuthorizationOnRequest?: boolean;
}
