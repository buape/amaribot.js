/*
Hi, welcome to looking in my code.
Any questions? Shoot me a message in the AmariBot Support server! TheShadow#8124
or just shoot me
that too
*/

import { Response } from "node-fetch"

export { RequestHandler } from "./RequestHandler"
export { AmariBot } from "./AmariBot"
export { AmariError } from "./errors/APIError"
export { RatelimitError } from "./errors/RatelimitError"

export type AmariBotOptions = {
	baseURL?: string
	version?: string
	debug?: boolean
	customFetch?: CustomFetch
}

export type CustomFetch = (url: string, options: RequestInit) => Promise<Response>

export type PaginationOptions = {
	limit?: number
	page?: number
}

export type RawPaginationOptions = Omit<PaginationOptions, "page">

export type APIError = {
	error: string
}

export type APIUser = {
	id: string
	username: string
	exp: number
	level: number
	weeklyExp: number
}

export type APILeaderboardUser = Omit<APIUser, "weeklyExp">
export type APIWeeklyUser = Omit<APIUser, "weeklyExp" | "level">

export type APIBulkUsers = {
	members: APIUser[]
	total_members: number
	queried_members: number
}

export type APILeaderboard = {
	data: APILeaderboardUser[]
	count: number
	total_count: number
}

export type APIRawLeaderboard = Omit<APILeaderboard, "total_count">

export type APIWeeklyLeaderboard = {
	data: APIWeeklyUser[]
	count: number
	total_count: number
}

export type APIRawWeeklyLeaderboard = Omit<APIWeeklyLeaderboard, "total_count">

export type APIRewards = {
	data: { roleID: string; level: number }[]
	count: number
}
