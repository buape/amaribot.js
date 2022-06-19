const fetch = require('node-fetch');
const { RatelimitError, APIError } = require("./errors")
const { AsyncQueue } = require("@sapphire/async-queue")
const queue = new AsyncQueue()
class RequestHandler {
    constructor(client) {
        this._client = client
    }

    async request(endpoint, query = {}, method = "GET", body, _attempts = 0) {
        return new Promise(async (resolve, reject) => {
            await queue.wait()
            // The following function (encode) is stolen from Axios ;p
            function encode(str) {
                var charMap = {
                    '!': '%21',
                    "'": '%27',
                    '(': '%28',
                    ')': '%29',
                    '~': '%7E',
                    '%20': '+',
                    '%00': '\x00'
                };
                return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function replacer(match) {
                    return charMap[match];
                });
            }
            function toQueryString (data) {
                if (Object.entries(data).length == 0) return "";
                let result = "";
                for (const [key, value] of Object.entries(data)) {
                    result.length == 0 ? result = "?" : result += "&";
                    result += `${encode(key)}=${encode(value)}`;
                }
                return result;
            }
            const url = `${this._client.baseURL}${this._client.version}${endpoint}${toQueryString(query)}`;
            const options = {
                method,
                headers: {
                    "Authorization": this._client.token,
                    "Content-Type": "application/json"
                },
                body: (body == null || Object.entries(body).length == 0) ? undefined : JSON.stringify(body),
                timeout: 15000
            };
            if (this._client.debug) console.debug(`Sending request to ${options.url}\nMethod:\n  ${options.method}\nParams:\n  ${query}`)
            try {
                const res = await fetch(url, options);
                if (res.status >= 200 && res.status < 300) {
										const json = await res.json();
										resolve(json);
										if (this._client.debug) console.debug("Success: \n", json);
                } else if (res.status === 429) {
										const json = await res.json();
                    if (this._client.debug) console.debug("Ratelimited: \n", res, json);
                    reject(new RatelimitError(res, json));
                } else {
										try {
												const json = await res.json();
												if (this._client.debug) console.debug("API Error: \n", res, json)
												reject(new APIError(res, json));
										} catch (err) {
												if (this._client.debug) console.debug("API Error: \n", res)
												reject(new APIError(res, null))
										}
                }
						} catch (err) {
								reject(err);
            } finally {
                queue.shift()
            }
        })
    }
}

module.exports = RequestHandler
