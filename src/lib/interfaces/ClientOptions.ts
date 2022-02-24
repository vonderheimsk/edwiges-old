export interface ClientRestOptions {
    api_version?: 6 | 7 | 8 | 9;
    alwaysSendAuthorizationOnRequest?: boolean;
}

export interface ClientShardingOptions {
    first_shard_id?: number;
    last_shard_id?: number;
    totalShards?: number | 'auto';
    connectOneShardAtTime?: boolean;
}

export interface ClientOptions {
    intents?: number;
    rest?: ClientRestOptions;
    sharding?: ClientShardingOptions;
}
