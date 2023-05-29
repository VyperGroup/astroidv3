// src/utils/normalizeHeaderName.ts
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
  if (typeof name !== "string") {
    name = String(name);
  }
  if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") {
    throw new TypeError("Invalid character in header field name");
  }
  return name.toLowerCase();
}

// src/utils/normalizeHeaderValue.ts
function normalizeHeaderValue(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return value;
}

// src/Headers.ts
var NORMALIZED_HEADERS = Symbol("normalizedHeaders");
var RAW_HEADER_NAMES = Symbol("rawHeaderNames");
var _a, _b;
var HeadersPolyfill = class {
  constructor(init) {
    this[_a] = {};
    this[_b] = /* @__PURE__ */ new Map();
    if (["Headers", "HeadersPolyfill"].includes(init == null ? void 0 : init.constructor.name) || init instanceof HeadersPolyfill) {
      const initialHeaders = init;
      initialHeaders.forEach((value, name) => {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(init)) {
      init.forEach(([name, value]) => {
        this.append(name, Array.isArray(value) ? value.join(", ") : value);
      });
    } else if (init) {
      Object.getOwnPropertyNames(init).forEach((name) => {
        const value = init[name];
        this.append(name, Array.isArray(value) ? value.join(", ") : value);
      });
    }
  }
  [(_a = NORMALIZED_HEADERS, _b = RAW_HEADER_NAMES, Symbol.iterator)]() {
    return this.entries();
  }
  *keys() {
    for (const name of Object.keys(this[NORMALIZED_HEADERS])) {
      yield name;
    }
  }
  *values() {
    for (const value of Object.values(this[NORMALIZED_HEADERS])) {
      yield value;
    }
  }
  *entries() {
    for (const name of Object.keys(this[NORMALIZED_HEADERS])) {
      yield [name, this.get(name)];
    }
  }
  get(name) {
    return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] || null;
  }
  set(name, value) {
    const normalizedName = normalizeHeaderName(name);
    this[NORMALIZED_HEADERS][normalizedName] = normalizeHeaderValue(value);
    this[RAW_HEADER_NAMES].set(normalizedName, name);
  }
  append(name, value) {
    const normalizedName = normalizeHeaderName(name);
    let resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${value}` : value;
    this.set(name, resolvedValue);
  }
  delete(name) {
    if (!this.has(name)) {
      return;
    }
    const normalizedName = normalizeHeaderName(name);
    delete this[NORMALIZED_HEADERS][normalizedName];
    this[RAW_HEADER_NAMES].delete(normalizedName);
  }
  all() {
    return this[NORMALIZED_HEADERS];
  }
  raw() {
    const rawHeaders = {};
    for (const [name, value] of this.entries()) {
      rawHeaders[this[RAW_HEADER_NAMES].get(name)] = value;
    }
    return rawHeaders;
  }
  has(name) {
    return this[NORMALIZED_HEADERS].hasOwnProperty(normalizeHeaderName(name));
  }
  forEach(callback, thisArg) {
    for (const name in this[NORMALIZED_HEADERS]) {
      if (this[NORMALIZED_HEADERS].hasOwnProperty(name)) {
        callback.call(thisArg, this[NORMALIZED_HEADERS][name], name, this);
      }
    }
  }
};

// src/transformers/headersToList.ts
function headersToList(headers) {
  const headersList = [];
  headers.forEach((value, name) => {
    const resolvedValue = value.includes(",") ? value.split(",").map((value2) => value2.trim()) : value;
    headersList.push([name, resolvedValue]);
  });
  return headersList;
}

// src/transformers/headersToString.ts
function headersToString(headers) {
  const list = headersToList(headers);
  const lines = list.map(([name, value]) => {
    const values = [].concat(value);
    return `${name}: ${values.join(", ")}`;
  });
  return lines.join("\r\n");
}

// src/transformers/headersToObject.ts
var singleValueHeaders = ["user-agent"];
function headersToObject(headers) {
  const headersObject = {};
  headers.forEach((value, name) => {
    const isMultiValue = !singleValueHeaders.includes(name.toLowerCase()) && value.includes(",");
    headersObject[name] = isMultiValue ? value.split(",").map((s) => s.trim()) : value;
  });
  return headersObject;
}

// src/transformers/stringToHeaders.ts
function stringToHeaders(str) {
  const lines = str.trim().split(/[\r\n]+/);
  return lines.reduce((headers, line) => {
    if (line.trim() === "") {
      return headers;
    }
    const parts = line.split(": ");
    const name = parts.shift();
    const value = parts.join(": ");
    headers.append(name, value);
    return headers;
  }, new HeadersPolyfill());
}

// src/transformers/listToHeaders.ts
function listToHeaders(list) {
  const headers = new HeadersPolyfill();
  list.forEach(([name, value]) => {
    const values = [].concat(value);
    values.forEach((value2) => {
      headers.append(name, value2);
    });
  });
  return headers;
}

// src/transformers/reduceHeadersObject.ts
function reduceHeadersObject(headers, reducer, initialState) {
  return Object.keys(headers).reduce((nextHeaders, name) => {
    return reducer(nextHeaders, name, headers[name]);
  }, initialState);
}

// src/transformers/objectToHeaders.ts
function objectToHeaders(headersObject) {
  return reduceHeadersObject(
    headersObject,
    (headers, name, value) => {
      const values = [].concat(value).filter(Boolean);
      values.forEach((value2) => {
        headers.append(name, value2);
      });
      return headers;
    },
    new HeadersPolyfill()
  );
}

// src/transformers/flattenHeadersList.ts
function flattenHeadersList(list) {
  return list.map(([name, values]) => {
    return [name, [].concat(values).join(", ")];
  });
}

// src/transformers/flattenHeadersObject.ts
function flattenHeadersObject(headersObject) {
  return reduceHeadersObject(
    headersObject,
    (headers, name, value) => {
      headers[name] = [].concat(value).join(", ");
      return headers;
    },
    {}
  );
}
export {
  HeadersPolyfill as Headers,
  flattenHeadersList,
  flattenHeadersObject,
  headersToList,
  headersToObject,
  headersToString,
  listToHeaders,
  objectToHeaders,
  reduceHeadersObject,
  stringToHeaders
};
//# sourceMappingURL=index.mjs.map