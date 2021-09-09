const axios = require("axios")
const { RatelimitError, APIError } = require("./errors")
const { AsyncQueue } = require("@sapphire/async-queue")
const queue = new AsyncQueue()
class RequestHandler {
    constructor(client) {
        this._client = client
    }

    async request(endpoint, query = {}, method, _attempts = 0) {
        await queue.wait()
        return new Promise((resolve, reject) => {
            const options = {
                validateStatus: null,
                headers: {
                    Authorization: this._client.token,
                    "Content-Type": "application/json",
                },
                baseURL: this._client.baseURL + this._client.version,
                url: endpoint,
                method: method,
                data: {},
                params: query,
                timeout: 15000,
            }

            if (this._client.debug) console.debug(`Sending request to ${options.url}\nMethod:\n  ${options.method}\nParams:\n  ${query}`)
            try {
                axios.request(options).then((res) => {
                    //  Increase the number of attempts
                    ++_attempts

                    if (res.status >= 200 && res.status < 300) {
                        resolve(res.data)
                        if (this._client.debug) console.debug("Success: \n", res.data)
                    } else if (res.status === 429) {
                        if (this._client.debug) console.debug("Ratelimited: \n", res)
                        reject(new RatelimitError(res))
                    } else {
                        if (this._client.debug) console.debug("API Error: \n", res)
                        reject(new APIError(res))
                    }
                })
            } finally {
                queue.shift()
            }
        })
    }
}

module.exports = RequestHandler
