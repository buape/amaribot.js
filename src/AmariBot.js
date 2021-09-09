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
     * @param {string} [options.baseURL="https://amaribot.com/api/"] - The base URL for the API requests, defaults to the amaribot.com API
     * @param {string} [options.version="v1"] - The base URL for the API requests, defaults v1
     */
    constructor(token, options = {}) {
        if (typeof token !== "string") throw new TypeError("The API token must be a string")
        if (typeof options !== "object") throw new TypeError("options must be an object")
        if (options.baseURL !== undefined && typeof options.baseURL !== "string") throw new TypeError("baseURL must be a string")
        if (options.baseURL !== undefined && !options.baseURL.endsWith("/")) throw new Error("baseURL must end with a /")
        if (options.version !== undefined && typeof options.version !== "string") throw new TypeError("version must be a string")
        if (options.debug !== undefined && typeof options.debug !== "boolean") throw new TypeError("options.debug must be a boolean")

        this.token = token
        this.debug = options.debug || false
        this.baseURL = options.baseURL || "https://amaribot.com/api/"
        this.version = options.version || "v1"
        this.requestHandler = new RequestHandler(this)

        if (this.debug) console.debug("amaribot.js initalized\n" + JSON.stringify(options, null, 2))
    }

    /**
     * Get a users data relative to a guild.
     *
     * @public
     * @async
     * @param {string} guildId - The guild ID to fetch the user from.
     * @param {string} userId - The user ID to fetch in the guild.
     * @throws {APIError}
     * @throws {RatelimitError}
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
     * Get a leaderboard of a guild
     *
     * @public
     * @async
     * @param {string} guildId - The guild ID to fetch the leaderboard from.
     * @param {object} [options] - Additional options
     * @param {number} [options.limit=50] - Set a limit for the number of users listed, max 1000
     * @param {number} [options.page=1] - Select which page you want to see on the leaderboard
     * @throws {APIError}
     * @throws {RatelimitError}
     * @returns {Promise<Leaderboard>} Leaderboard object.
     */
    async getGuildLeaderboard(guildId, options = {}) {
        if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (options.limit !== undefined && typeof options.limit !== "number") throw new TypeError("options.limit must be a number")
        if (options.page !== undefined && typeof options.page !== "number") throw new TypeError("options.page must be a number")

        const data = await this._request(`/guild/leaderboard/${guildId}`, options)
        data.id = guildId
        return new Leaderboard(data)
    }

     /**
     * Get the raw leaderboard of a guild
     *
     * @public
     * @async
     * @param {string} guildId - The guild ID to fetch the leaderboard from.
     * @param {object} [options] - Additional options
     * @param {number} [options.limit=50] - Set a limit for the number of users listed
     * @throws {APIError}
     * @throws {RatelimitError}
     * @returns {Promise<Leaderboard>} Leaderboard object.
     */
      async getRawGuildLeaderboard(guildId, options = {}) {
        if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (options.limit !== undefined && typeof options.limit !== "number") throw new TypeError("options.limit must be a number")
        if (options.page !== undefined && typeof options.page !== "number") throw new TypeError("options.page must be a number")

        const data = await this._request(`/guild/raw/leaderboard/${guildId}`, options)
        data.id = guildId
        return new Leaderboard(data)
    }

    /**
     * Get the weekly leaderboard of a guild
     *
     * @public
     * @async
     * @param {string} guildId - The guild ID to fetch the leaderboard from.
     * @param {object} [options] - Additional options
     * @param {number} [options.limit=50] - Set a limit for the number of users listed, max 1000
     * @param {number} [options.page=1] - Select which page you want to see on the leaderboard
     * @throws {APIError}
     * @throws {RatelimitError}
     * @returns {Promise<Leaderboard>} Leaderboard object.
     */
    async getWeeklyLeaderboard(guildId, options = {}) {
        if (this.debug) console.debug(`Event: getWeeklyLeaderboard\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)
        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (options.limit !== undefined && typeof options.limit !== "number") throw new TypeError("options.limit must be a number")
        if (options.page !== undefined && typeof options.page !== "number") throw new TypeError("options.page must be a number")

        const data = await this._request(`/guild/${this.rawRoutes ? "raw/" : ""}weekly/${guildId}`, options)
        data.id = guildId
        return new Leaderboard(data)
    }

    /**
     * Get the raw weekly leaderboard of a guild
     *
     * @public
     * @async
     * @param {string} guildId - The guild ID to fetch the leaderboard from.
     * @param {object} [options] - Additional options
     * @param {number} [options.limit=50] - Set a limit for the number of users listed
     * @throws {APIError}
     * @throws {RatelimitError}
     * @returns {Promise<Leaderboard>} Leaderboard object.
     */
    async getRawWeeklyLeaderboard(guildId, options = {}) {
        if (this.debug) console.debug(`Event: getWeeklyLeaderboard\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)
        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (options.limit !== undefined && typeof options.limit !== "number") throw new TypeError("options.limit must be a number")

        const data = await this._request(`/guild/${this.rawRoutes ? "raw/" : ""}weekly/${guildId}`, options)
        data.id = guildId
        return new Leaderboard(data)
    }

    /**
     * Get a guild's rewards
     *
     * @public
     * @async
     * @param {string} guildId - The guild ID to fetch the rewards from.
     * @param {object} [options] - Additional options
     * @param {number} [options.limit=50] - Set a limit for the number of users listed, max 1000
     * @param {number} [options.page=1] - Select which page you want to see on the leaderboard
     * @throws {APIError}
     * @throws {RatelimitError}
     * @returns {Promise<Rewards>} Rewards object.
     */
    async getGuildRewards(guildId, options = {}) {
        if (this.debug) console.debug(`Event: getGuildRewards\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (options.limit !== undefined && typeof options.limit !== "number") throw new TypeError("options.limit must be a number")
        if (options.page !== undefined && typeof options.version !== "number") throw new TypeError("options.page must be a number")

        const data = await this._request(`/guild/rewards/${guildId}`, options)
        return new Rewards(data)
    }

    /**
     * Get a user's position in the leaderboard
     *
     * @public
     * @async
     * @param {string} guildId - The guild ID to fetch the user from.
     * @param {string} userId - The user ID to fetch in the guild.
     * @throws {APIError}
     * @throws {RatelimitError}
     * @returns {Promise<number>} The user's position
     */
    async getLeaderboardPosition(guildId, userId, options = {}) {
        if (this.debug) console.debug(`Event: getLeaderboardPosition\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

        if (typeof guildId !== "string") throw new TypeError("guildId must be a string")
        if (typeof userId !== "string") throw new TypeError("userId must be a string")

        const lb = await this.getRawGuildLeaderboard(guildId, {limit: 500000})
        const userData = lb.rawData.data.find((x) => x.id == userId)
        if(!userData) throw new Error(`User ${userId} not found`)
        const position = lb.rawData.data.indexOf(userData)
        return position + 1 // the position is from an array which is 0 based
    }

    /**
     * Get the exp needed to reach the next level up
     *
     * @public
     * @param {string} level - The current level the user is at
     * @throws {APIError}
     * @throws {RatelimitError}
     * @returns {number} Exp needed for next level up
     */
    getLevelExp(level) {
        if (this.debug) console.debug(`Event: getLevelExp\n  - Level: ${level}`)
        if(!typeof level == "number") throw new TypeError("The level provided must be a number!")
        let value = 20 * (level * level) + 35
        return value
    }

    /**
     * Internal method to hit the API
     *
     * @private
     * @param {string} endpoint - The API endpoint to request
     * @param {string} [method="GET"] - The HTTP method to use (GET, PUT, PATCH etc.)
     * @param {object} [query={}] - Query parameters
     * @throws {RatelimitError}
     * @returns {Promise<any>} The raw request data
     */
    _request(endpoint, query = {}, method = "GET", ) {
        return this.requestHandler.request(endpoint, query, method)
    }
}

module.exports = AmariBot
