/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import type { Request } from './AbstractMessage.js';
import type { Options } from './BareServer.js';
import type { IncomingMessage } from 'node:http';
import type { Duplex } from 'node:stream';
export interface BareRemote {
    host: string;
    port: number | string;
    path: string;
    protocol: string;
}
export type BareHeaders = Record<string, string | string[]>;
export declare function randomHex(byteLength: number): string;
export declare function fetch(request: Request, signal: AbortSignal, requestHeaders: BareHeaders, remote: BareRemote, options: Options): Promise<IncomingMessage>;
export declare function upgradeFetch(request: Request, signal: AbortSignal, requestHeaders: BareHeaders, remote: BareRemote, options: Options): Promise<[res: IncomingMessage, socket: Duplex, head: Buffer]>;
