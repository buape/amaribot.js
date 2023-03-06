import {
	AmariBotOptions,
	APIBulkUsers,
	APILeaderboard,
	APIRawLeaderboard,
	APIRawWeeklyLeaderboard,
	APIRewards,
	APIUser,
	APIWeeklyLeaderboard,
	PaginationOptions,
	RawPaginationOptions,
} from "."
import { RequestHandler } from "./RequestHandler"

export class AmariBot {
	apiKey: string
	debug: boolean
	baseURL: string
	version: string

	/**
	 * @private
	 */
	_requestHandler: RequestHandler

	/**
	 *
	 * @description This is the main class that you initalize to perform all the requests to the API
	 * @param {string} apiKey - The token you use to authenticate to the API
	 * @param {AmariBotOptions} options - Additional options for the API handler
	 */
	constructor(apiKey: string, options: AmariBotOptions = {}) {
		this.apiKey = apiKey
		this.debug = options.debug || false
		this.baseURL = options.baseURL || "https://amaribot.com/api"
		this.version = options.version || "v1"
		this._requestHandler = new RequestHandler(this)

		if (this.debug) console.debug("amaribot.js initalized\n" + JSON.stringify(options, null, 2))
	}

	async getUserLevel(guildId: string, userId: string | string[]): Promise<APIUser> {
		if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}\n  - User: ${userId}`)
		const data = (await this._request(`/guild/${guildId}/member/${userId}`)) as APIUser
		return data
	}

	async getBulkUserLevel(guildId: string, userId: string[]) {
		if (this.debug) console.debug(`Event: getBulkUserLevel\n  - Guild: ${guildId}\n  - Users: ${userId}`)
		const data = (await this._request(`/guild/${guildId}/members`, {}, "POST", { members: userId })) as APIBulkUsers
		return data
	}

	async getLeaderboard(guildId: string, options: PaginationOptions = {}) {
		if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

		const data = (await this._request(`/guild/leaderboard/${guildId}`, options)) as APILeaderboard
		return data
	}

	async getRawLeaderboard(guildId: string, options: RawPaginationOptions = {}) {
		if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

		const data = (await this._request(`/guild/raw/leaderboard/${guildId}`, options)) as APIRawLeaderboard
		return data
	}

	async getWeeklyLeaderboard(guildId: string, options: PaginationOptions = {}) {
		if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

		const data = (await this._request(`/guild/weekly/${guildId}`, options)) as APIWeeklyLeaderboard
		return data
	}

	async getRawWeeklyLeaderboard(guildId: string, options: RawPaginationOptions = {}) {
		if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

		const data = (await this._request(`/guild/raw/weekly/${guildId}`, options)) as APIRawWeeklyLeaderboard
		return data
	}

	/**
	 * @description Combines the main leaderboard and the weekly leaderboard into one
	 */
	async getCombinedLeaderboard(guildId: string) {
		if (this.debug) console.debug(`Event: getUserLevel\n  - Guild: ${guildId}`)

		const mainLeaderboard = await this.getRawLeaderboard(guildId)
		const weeklyLeaderboard = await this.getRawWeeklyLeaderboard(guildId)

		// combine the two leaderboards
		const combinedLeaderboard = mainLeaderboard.data.map((x) => {
			const weeklyData = weeklyLeaderboard.data.find((y) => y.id === x.id)
			const user: APIUser = { ...x, weeklyExp: weeklyData?.exp ?? 0 }
			return user
		})

		return {
			data: combinedLeaderboard,
			count: combinedLeaderboard.length,
		}
	}

	async getGuildRewards(guildId: string, options: PaginationOptions = {}) {
		if (this.debug) console.debug(`Event: getGuildRewards\n  - Guild: ${guildId}\n  - Options: ${JSON.stringify(options, null, 2)}`)

		const data = (await this._request(`/guild/rewards/${guildId}`, options)) as APIRewards
		return data
	}

	async getLeaderboardPosition(guildId: string, userId: string) {
		if (this.debug) console.debug(`Event: getLeaderboardPosition\n  - Guild: ${guildId}\n  - User: ${userId}`)

		const lb = await this.getRawLeaderboard(guildId, { limit: 500000 })
		const userData = lb.data.find((x) => x.id == userId)
		if (!userData) throw new Error(`User ${userId} not found`)
		const position = lb.data.indexOf(userData)
		return position + 1 // the position is from an array which is 0 based
	}

	async getWeeklyLeaderboardPosition(guildId: string, userId: string) {
		if (this.debug) console.debug(`Event: getWeeklyLeaderboardPosition\n  - Guild: ${guildId}\n  - User: ${userId}`)

		const lb = await this.getRawWeeklyLeaderboard(guildId, { limit: 500000 })
		const userData = lb.data.find((x) => x.id == userId)
		if (!userData) throw new Error(`User ${userId} not found`)
		const position = lb.data.indexOf(userData)
		return position + 1 // the position is from an array which is 0 based
	}

	getNextLevelExp(level: number) {
		if (this.debug) console.debug(`Event: getLevelExp\n  - Level: ${level}`)
		let value = 20 * (level * level) + 35
		return value
	}

	/**
	 * @private
	 */
	_request(endpoint: string, query: { [key: string]: string | number } = {}, method = "GET", body: { [key: string]: any } = {}) {
		return this._requestHandler.request(endpoint, query, method, body)
	}
}
