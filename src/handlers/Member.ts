import { BaseHandler } from "."
import { APIMember, APIWeeklyMember } from ".."

export class Member extends BaseHandler {
	public async get(guildId: string) {
		return (await this._handler.request("/member", { guildId })) as APIMember
	}

	public async getRank(guildId: string, userId: string) {
		return (await this._handler.request("/member/rank", { guildId, userId })) as APIMember & { rank: number }
	}

	public async getWeeklyRank(guildId: string, userId: string) {
		return (await this._handler.request("/member/rank/weekly", { guildId, userId })) as APIWeeklyMember & { rank: number }
	}
}
