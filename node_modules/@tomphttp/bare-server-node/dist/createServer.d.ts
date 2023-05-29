/// <reference types="node" />
/// <reference types="node" />
import BareServer from './BareServer.js';
import type { Options, BareMaintainer } from './BareServer.js';
import type { Database } from './Meta.js';
import { Agent as HttpAgent } from 'node:http';
import { Agent as HttpsAgent } from 'node:https';
declare namespace createBareServer {
    type IPFamily = 0 | 4 | 6;
    interface BareServerInit {
        logErrors?: boolean;
        localAddress?: string;
        /**
         * When set, the default logic for blocking local IP addresses is disabled.
         */
        filterRemote?: Options['filterRemote'];
        /**
         * When set, the default logic for blocking local IP addresses is disabled.
         */
        lookup?: Options['lookup'];
        /**
         * If local IP addresses/DNS records should be blocked.
         * @default true
         */
        blockLocal?: boolean;
        /**
         * IP address family to use when resolving `host` or `hostname`. Valid values are `0`, `4`, and `6`. When unspecified/0, both IP v4 and v6 will be used.
         */
        family?: IPFamily | number;
        maintainer?: BareMaintainer;
        httpAgent?: HttpAgent;
        httpsAgent?: HttpsAgent;
        database?: Database;
    }
}
/**
 * Create a Bare server.
 * This will handle all lifecycles for unspecified options (httpAgent, httpsAgent, metaMap).
 */
declare function createBareServer(directory: string, init?: createBareServer.BareServerInit): BareServer;
export = createBareServer;
