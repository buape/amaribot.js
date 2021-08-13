const RequestHandler = require("./RequestHandler")
const { User } = require("./structures")

class Client {
    /**
     *
     * @constructs Client
     * @description This is the Client that you initalize to perform all the requests to the API
     * @param {string} token - The token you use to authenticate to the API
     * @param {object} [options={}] - Additional options for the client
     * @throws {TypeError}
     */
    constructor(token, options = {}) {
        if (typeof token !== "string") throw new TypeError("The API token must be a string")
        if (typeof options !== "object") throw new TypeError("options must be an object")
        if (options.baseURL !== undefined && typeof options.baseURL !== "string") throw new TypeError("baseURL must be a string")
        if (options.version !== undefined && typeof options.version !== "number") throw new TypeError("version must be a number")
        if (options.maxRetries !== undefined && typeof options.maxRetries !== "number") throw new TypeError("maxRetries must be a number")

        this.token = token
        this.baseURL = "https://api.amaribot.com"
        this.requestHandler = new RequestHandler(this)
    }

    /**
     * Get a users data relative to a guild.
     *
     * @public
     * @param {string} guildId - The guild ID to fetch the user from.
     * @param {string} userId - The user ID to fetch in the guild.
     * @throws {TypeError}
     * @returns {Promise<User>} User object.
     */
    async getUserLevel(guildId, userId) {
        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (typeof userId !== "string") throw new TypeError("userId must be a string")

        const data = await this._request(`/guild/${guildId}/member/${userId}`)
        return new User(data)
    }

    /**
     * Get a guild's leaderboard
     *
     * @public
     * @param {string} guildId - The guild ID to fetch the leaderboard from.
     * @throws {TypeError}
     * @returns {Promise<Leaderboard>} User object.
     */
    async getUserLevel(guildId, userId) {
        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (typeof userId !== "string") throw new TypeError("userId must be a string")

        const data = await this._request(`/guild/${guildId}/member/${userId}`)
        return new User(data)
    }

    /**
     * Internal method to hit the API
     *
     * @private
     * @param {string} endpoint - The API endpoint to request
     * @param {string} method - The HTTP method to use (GET, PUT, PATCH etc.)
     * @param {object} [query={}] - Query parameters
     * @returns {Promise<any>} The raw request data
     */
    _request(endpoint, type = "GET", query = {}) {
        return this.requestHandler.request(endpoint, method, query)
    }
}

module.exports = Client
