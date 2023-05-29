"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeFetch = exports.fetch = exports.randomHex = void 0;
const BareServer_js_1 = require("./BareServer.js");
const node_crypto_1 = require("node:crypto");
const node_http_1 = require("node:http");
const node_https_1 = require("node:https");
function randomHex(byteLength) {
    const bytes = new Uint8Array(byteLength);
    (0, node_crypto_1.getRandomValues)(bytes);
    let hex = '';
    for (const byte of bytes)
        hex += byte.toString(16).padStart(2, '0');
    return hex;
}
exports.randomHex = randomHex;
function outgoingError(error) {
    if (error instanceof Error) {
        switch (error.code) {
            case 'ENOTFOUND':
                return new BareServer_js_1.BareError(500, {
                    code: 'HOST_NOT_FOUND',
                    id: 'request',
                    message: 'The specified host could not be resolved.',
                });
            case 'ECONNREFUSED':
                return new BareServer_js_1.BareError(500, {
                    code: 'CONNECTION_REFUSED',
                    id: 'response',
                    message: 'The remote rejected the request.',
                });
            case 'ECONNRESET':
                return new BareServer_js_1.BareError(500, {
                    code: 'CONNECTION_RESET',
                    id: 'response',
                    message: 'The request was forcibly closed.',
                });
            case 'ETIMEOUT':
                return new BareServer_js_1.BareError(500, {
                    code: 'CONNECTION_TIMEOUT',
                    id: 'response',
                    message: 'The response timed out.',
                });
        }
    }
    return error;
}
async function fetch(request, signal, requestHeaders, remote, options) {
    if (options.filterRemote)
        await options.filterRemote(remote);
    const req = {
        host: remote.host,
        port: remote.port,
        path: remote.path,
        method: request.method,
        headers: requestHeaders,
        setHost: false,
        signal,
        localAddress: options.localAddress,
        family: options.family,
        lookup: options.lookup,
    };
    let outgoing;
    if (remote.protocol === 'https:')
        outgoing = (0, node_https_1.request)({
            ...req,
            agent: options.httpsAgent,
        });
    else if (remote.protocol === 'http:')
        outgoing = (0, node_http_1.request)({
            ...req,
            agent: options.httpAgent,
        });
    else
        throw new RangeError(`Unsupported protocol: '${remote.protocol}'`);
    request.body.pipe(outgoing);
    return await new Promise((resolve, reject) => {
        outgoing.on('response', (response) => {
            resolve(response);
        });
        outgoing.on('upgrade', (req, socket) => {
            reject('Remote did not send a response');
            socket.destroy();
        });
        outgoing.on('error', (error) => {
            reject(outgoingError(error));
        });
    });
}
exports.fetch = fetch;
async function upgradeFetch(request, signal, requestHeaders, remote, options) {
    if (options.filterRemote)
        await options.filterRemote(remote);
    const req = {
        host: remote.host,
        port: remote.port,
        path: remote.path,
        headers: requestHeaders,
        method: request.method,
        timeout: 12e3,
        setHost: false,
        signal,
        localAddress: options.localAddress,
        family: options.family,
        lookup: options.lookup,
    };
    let outgoing;
    if (remote.protocol === 'wss:')
        outgoing = (0, node_https_1.request)({ ...req, agent: options.httpsAgent });
    else if (remote.protocol === 'ws:')
        outgoing = (0, node_http_1.request)({ ...req, agent: options.httpAgent });
    else
        throw new RangeError(`Unsupported protocol: '${remote.protocol}'`);
    outgoing.end();
    return await new Promise((resolve, reject) => {
        outgoing.on('response', (res) => {
            reject(new Error('Remote did not upgrade the WebSocket'));
            res.destroy();
        });
        outgoing.on('upgrade', (res, socket, head) => {
            resolve([res, socket, head]);
        });
        outgoing.on('error', (error) => {
            reject(outgoingError(error));
        });
    });
}
exports.upgradeFetch = upgradeFetch;
//# sourceMappingURL=requestUtil.js.map