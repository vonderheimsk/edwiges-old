export const GatewayCloseCodes = {
    4000: 'Unknown Error',
    4001: 'Unknown Opcode',
    4002: 'Decode Error',
    4003: 'Not Authenticated',
    4004: 'Authentication Failed',
    4005: 'Already Authenticated',
    4007: 'Invalid Sequence',
    4008: 'Rate Limited',
    4009: 'Session Timeout',
    4010: 'Invalid Shard',
    4011: 'Sharding Required',
    4012: 'Invalid API Version',
    4013: 'Invalid Intents',
    4014: 'Disallowed Intent',
}

export const VoiceCloseCodes = {
    4001: 'Unknown Opcode',
    4002: 'Failed To Decode Payload',
    4003: 'Not Authenticated',
    4004: 'Authentication Failed',
    4005: 'Already Authenticated',
    4006: 'Session No Longer Valid',
    4009: 'Session Timeout',
    4011: 'Server Not Found',
    4012: 'Unknown Protocol',
    4014: 'Disconnected',
    4015: 'Voice Server Crashed',
    4016: 'Unknown Encryption Mode',
}

export const RPCCloseCodes = {
    4000: 'Invalid Client ID',
    4001: 'Invalid Origin',
    4002: 'Rate Limited',
    4003: 'Token Revoked',
    4004: 'Invalid Version',
    4005: 'Invalid Encoding',
}