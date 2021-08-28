const RequestHandler = require("./RequestHandler")
const { User, Leaderboard, Rewards } = require("./structures")

class AmariBot {
    /**
     *
     * @constructs AmariBot
     * @description This is the main class that you initalize to perform all the requests to the API
     * @param {string} token - The token you use to authenticate to the API
     * @param {object} options - Additional options for the API handler
     * @param {string} options.token - Your API token from the AmariBot website
     * @param {boolean} [options.debug=false] - Controls whether debug mode is enabled for the library
     * @param {boolean} [options.rawRoutes=true] - Controls whether the raw routes are used for the leaderboard requests. This will default to false in a future update once the non-raw routes are properly working.
     * @param {string} [options.baseURL="https://amaribot.com/api/v1"] - The base URL for the API requests, defaults to the amaribot.com v1 API
     */
    constructor(token, options = {}) {
        if (typeof token !== "string") throw new TypeError("The API token must be a string")
        if (typeof options !== "object") throw new TypeError("options must be an object")
        if (options.baseURL !== undefined && typeof options.baseURL !== "string") throw new TypeError("baseURL must be a string")
        if (options.debug !== undefined && typeof options.debug !== "boolean") throw new TypeError("options.debug must be a boolean")
        if (options.rawRoutes !== undefined && typeof options.debug !== "boolean") throw new TypeError("options.rawRoutes must be a boolean")

        this.token = token
        this.debug = options.debug || false
        this.baseURL = options.baseURL || "https://amaribot.com/api/v1"
        this.rawRoutes = options.rawRoutes || true
        this.requestHandler = new RequestHandler(this)

        if (this.debug) console.debug("amaribot.js initalized\n" + JSON.stringify(options, null, 2))
    }

    /**
     * Get a users data relative to a guild.
     *
     * @public
     * @param {string} guildId - The guild ID to fetch the user from.
     * @param {string} userId - The user ID to fetch in the guild.
     * @returns {Promise<User>} User object.
     */
    async getUserLevel(guildId, userId) {
        if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}\n  - User: ${userId}`)

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
     * @param {object} [options] - Additional options
     * @param {number} [options.limit=50] - Set a limit for the number of users listed, max 1000
     * @param {number} [options.page=1] - Select which page you want to see on the leaderboard
     * @returns {Promise<Leaderboard>} Leaderboard object.
     */
    async getGuildLeaderboard(guildId, options = {}) {
        if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (options.limit !== undefined && typeof options.baseURL !== "string") throw new TypeError("options.limit must be a number")
        if (options.page !== undefined && typeof options.version !== "number") throw new TypeError("options.page must be a number")

        const data = await this._request(`/guild/raw/leaderboard/${guildId}`)
        data.id = guildId
        return new Leaderboard(data)
    }

    /**
     * Get a guild's weekly leaderboard
     *
     * @public
     * @param {string} guildId - The guild ID to fetch the leaderboard from.
     * @param {object} [options] - Additional options
     * @param {number} [options.limit=50] - Set a limit for the number of users listed, max 1000
     * @param {number} [options.page=1] - Select which page you want to see on the leaderboard
     * @returns {Promise<Leaderboard>} Leaderboard object.
     */
    async getWeeklyLeaderboard(guildId, options = {}) {
        if (this.debug) console.debug(`Event: getWeeklyLeaderboard\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)
        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (options.limit !== undefined && typeof options.baseURL !== "string") throw new TypeError("options.limit must be a number")
        if (options.page !== undefined && typeof options.version !== "number") throw new TypeError("options.page must be a number")

        const data = await this._request(`/guild/raw/weekly/${guildId}`)
        data.id = guildId
        return new Leaderboard(data)
    }

    /**
     * Get a guild's rewards
     *
     * @public
     * @param {string} guildId - The guild ID to fetch the rewards from.
     * @param {object} [options] - Additional options
     * @param {number} [options.limit=50] - Set a limit for the number of users listed, max 1000
     * @param {number} [options.page=1] - Select which page you want to see on the leaderboard
     * @returns {Promise<Rewards>} Rewards object.
     */
    async getGuildRewards(guildId, options = {}) {
        if (this.debug) console.debug(`Event: getGuildRewards\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (options.limit !== undefined && typeof options.baseURL !== "string") throw new TypeError("options.limit must be a number")
        if (options.page !== undefined && typeof options.version !== "number") throw new TypeError("options.page must be a number")

        const data = await this._request(`/guild/rewards/${guildId}`)
        data.id = guildId
        return new Rewards(data)
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
    _request(endpoint, method = "GET", query = {}) {
        return this.requestHandler.request(endpoint, method, query)
    }
}

module.exports = AmariBot
