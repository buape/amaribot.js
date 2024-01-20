export type APIError = {
	error: string
}

export type APIAnnouncement = {
	guildId: string
	level: number
	message: string
}

export type APIGlobalAnnouncement = {
	type: string
	ping: boolean
	message: string
}

export type APIAnnouncements = {
	guildId: string
	announcements: Array<APIAnnouncement>
	count: number
}

export type APINormalLeaderboard = Array<APIMember>
export type APIWeeklyLeaderboard = Array<APIWeeklyMember>

export type APIBlacklist = {
	guildedId: string
	channels: Array<string>
	roles: Array<string>
}

export type APIJoinRole = {
	guildId: string
	id: string
	name: string
}

export type APIMultipliers = {
	global: string
	channels: Array<string>
	roles: Array<string>
}

export type APIReward = {
	level: number
	id: string
	name: string
}

export type APIVoice = {
	enabled: boolean
	multi: number
	cooldown: number
	minUsers: number
	blacklist: Array<string>
}

export type APIWeekly = {
	enabled: boolean
}

export type APISettings = {
	guildId: string
	prefix: string
	blacklist: APIBlacklist
	coleave: boolean
	cooldown: number
	globalAnnouncement: APIGlobalAnnouncement
	multipliers: APIMultipliers
	roleSettings: string
	voice: APIVoice
	weeklyPoints: boolean
}

export type APIMember = {
	userId: string
	guildId: string
	username: string
	exp: number
	level: number
	weeklyExp: number
}

export type APIWeeklyMember = {
	id: string
	username: string
	exp: number
}

export type APIUser = {
	userId: string
	color: string
	background: boolean
	opacity: number
}
