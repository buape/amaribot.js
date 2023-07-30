import { BaseHandler } from "."
import { APINormalLeaderboard, APIWeeklyLeaderboard, LeaderboardResult } from ".."

export class Leaderboard extends BaseHandler {
	public async get(guildId: string) {
		return (await this._handler.request("/guild/leaderboard", { guildId })) as LeaderboardResult<APINormalLeaderboard>
	}

	public async getWeekly(guildId: string) {
		return (await this._handler.request("/guild/leaderboard/weekly", { guildId })) as LeaderboardResult<APIWeeklyLeaderboard>
	}
}
