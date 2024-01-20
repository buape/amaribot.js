import { BaseHandler } from "."
import { APIAnnouncement, APIAnnouncements, LeaderboardOptions } from ".."

export class Announcements extends BaseHandler {
	public async getAll(guildId: string) {
		return (await this._handler.request("/guild/announcements", { guildId })) as APIAnnouncements
	}

	public async get(guildId: string, options: LeaderboardOptions) {
		return (await this._handler.request("/guild/announcements", { guildId, ...options })) as APIAnnouncement
	}
}
