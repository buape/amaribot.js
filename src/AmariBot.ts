import { AmariBotOptions, CustomFetch } from "."
import { RequestHandler } from "./RequestHandler"
import fetch from "node-fetch"
import { Announcements, Leaderboard, Member, Settings, User } from "./handlers"

export class AmariBot {
	apiKey: string
	debug: boolean
	baseURL: string
	version: string
	customFetch?: CustomFetch

	announcements: Announcements
	leaderboard: Leaderboard
	member: Member
	settings: Settings
	user: User

	/**
	 * @private
	 */
	_requestHandler: RequestHandler

	/**
	 *
	 * @description This is the main class that you initialize to perform all the requests to the API
	 * @param {string} apiKey - The token you use to authenticate to the API
	 * @param {AmariBotOptions} options - Additional options for the API handler
	 */
	constructor(apiKey: string, options: AmariBotOptions = {}) {
		this.apiKey = apiKey
		this.version = options.version || "v2"
		this.baseURL = options.baseURL || "https://amaribot.com/api"
		this.debug = options.debug || false
		this.customFetch = options.customFetch || fetch
		this._requestHandler = new RequestHandler(this)

		this.announcements = new Announcements(this._requestHandler)
		this.leaderboard = new Leaderboard(this._requestHandler)
		this.member = new Member(this._requestHandler)
		this.settings = new Settings(this._requestHandler)
		this.user = new User(this._requestHandler)

		if (this.debug) console.debug("amaribot.js initialized\n" + JSON.stringify(options, null, 2))
	}
}
