declare type HeadersList = Array<[string, string | string[]]>;
declare type FlatHeadersList = [string, string][];
declare type HeadersObject = Record<string, string | string[]>;
declare type FlatHeadersObject = Record<string, string>;

declare const NORMALIZED_HEADERS: unique symbol;
declare const RAW_HEADER_NAMES: unique symbol;
declare class HeadersPolyfill {
    private [NORMALIZED_HEADERS];
    private [RAW_HEADER_NAMES];
    constructor(init?: HeadersInit | HeadersObject | HeadersList);
    [Symbol.iterator](): IterableIterator<[string, string]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<string>;
    entries(): IterableIterator<[string, string]>;
    /**
     * Returns a `ByteString` sequence of all the values of a header with a given name.
     */
    get(name: string): string | null;
    /**
     * Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
     */
    set(name: string, value: string): void;
    /**
     * Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
     */
    append(name: string, value: string): void;
    /**
     * Deletes a header from the `Headers` object.
     */
    delete(name: string): void;
    /**
     * Returns the object of all the normalized headers.
     */
    all(): Record<string, string>;
    /**
     * Returns the object of all the raw headers.
     */
    raw(): Record<string, string>;
    /**
     * Returns a boolean stating whether a `Headers` object contains a certain header.
     */
    has(name: string): boolean;
    /**
     * Traverses the `Headers` object,
     * calling the given callback for each header.
     */
    forEach<ThisArg = this>(callback: (this: ThisArg, value: string, name: string, parent: this) => void, thisArg?: ThisArg): void;
}

/**
 * Converts a given `Headers` instance to its string representation.
 */
declare function headersToString(headers: Headers): string;

declare function headersToList(headers: Headers): HeadersList;

/**
 * Converts a given `Headers` instance into a plain object.
 * Respects headers with multiple values.
 */
declare function headersToObject(headers: Headers): HeadersObject;

/**
 * Converts a string representation of headers (i.e. from XMLHttpRequest)
 * to a new `Headers` instance.
 */
declare function stringToHeaders(str: string): HeadersPolyfill;

declare function listToHeaders(list: HeadersList): HeadersPolyfill;

/**
 * Converts a given headers object to a new `Headers` instance.
 */
declare function objectToHeaders(headersObject: Record<string, string | string[] | undefined>): HeadersPolyfill;

/**
 * Reduces given headers object instnace.
 */
declare function reduceHeadersObject<R>(headers: HeadersObject, reducer: (headers: R, name: string, value: string | string[]) => R, initialState: R): R;

declare function flattenHeadersList(list: HeadersList): FlatHeadersList;

declare function flattenHeadersObject(headersObject: HeadersObject): FlatHeadersObject;

export { FlatHeadersList, FlatHeadersObject, HeadersPolyfill as Headers, HeadersList, HeadersObject, flattenHeadersList, flattenHeadersObject, headersToList, headersToObject, headersToString, listToHeaders, objectToHeaders, reduceHeadersObject, stringToHeaders };
