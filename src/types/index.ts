import { Response as NodeFetchResponse, RequestInit } from "node-fetch"

export type AmariBotOptions = {
	baseURL?: string
	version?: string
	debug?: boolean
	customFetch?: CustomFetch
}

export type CustomFetch = (url: string, options: RequestInit) => Promise<CustomResponse>
export type CustomResponse = NodeFetchResponse | Response

export type LeaderboardOptions = {
	level?: number
	limit?: number
	page?: number
	raw?: boolean
}

export type LeaderboardResult<LeaderboardType> = {
	guildId: string
	leaderboard: LeaderboardType[]
	count: number
}

export type * from "./api"
