import { BaseHandler } from "."
import { APIJoinRole, APIMultipliers, APIReward, APISettings, APIVoice, APIWeekly } from ".."

export class Settings extends BaseHandler {
	public async get(guildId: string) {
		return (await this._handler.request("/guild/settings", { guildId })) as APISettings
	}

	public async getBlacklist(guildId: string) {
		return (await this._handler.request("/guild/settings/blacklist", { guildId })) as APISettings
	}

	public async getJoinRole(guildId: string) {
		return (await this._handler.request("/guild/settings/joinrole", { guildId })) as APIJoinRole
	}

	public async getMultipliers(guildId: string) {
		return (await this._handler.request("/guild/settings/multipliers", { guildId })) as APIMultipliers
	}

	public async getRewards(guildId: string) {
		return (await this._handler.request("/guild/settings/rewards", { guildId })) as Array<APIReward>
	}

	public async getVoice(guildId: string) {
		return (await this._handler.request("/guild/settings/voice", { guildId })) as APIVoice
	}

	public async getWeekly(guildId: string) {
		return (await this._handler.request("/guild/settings/weekly", { guildId })) as APIWeekly
	}
}
