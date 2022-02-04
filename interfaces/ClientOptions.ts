export default interface ClientOptions {
    api_version?: number;
    first_shard_id?: number;
    last_shard_id?: number;
    shards?: number;
    connectOneShardAtTime?: boolean;
    alwaysSendAuthorizationOnRequest?: boolean;
}
