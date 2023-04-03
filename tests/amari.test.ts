import fetch from "node-fetch"
import { AmariBot } from "../src"
import { expect, expectTypeOf, test } from "vitest"
import { RequestInit } from "node-fetch"

const guildId = "346474194394939393"
const userId = "439223656200273932"
const secondUserId = "107510319315697664"

const apiKey = process.env.TEST_API_KEY
if (!apiKey) throw new Error("No API key provided")
const debug = false

const client = new AmariBot(apiKey, { debug })

test("The client should have initalized properly", () => {
	expect(client).toBeInstanceOf(AmariBot)
	expect(client.apiKey).toBe(apiKey)
	expect(client.debug).toBe(debug)
	expect(client.baseURL).toBe("https://amaribot.com/api")
	expect(client.version).toBe("v1")
	expect(client._requestHandler).toBeDefined()
	expect(client._requestHandler).toHaveProperty("request")
	expectTypeOf(client._requestHandler.request).toBeFunction()
})

test("The client should be able to get a user level", async () => {
	const data = await client.getUserLevel(guildId, userId)

	expect(data).toBeDefined()
	expect(data.id).toBe(userId)

	expectTypeOf(data.username).toBeString()
	expectTypeOf(data.exp).toBeNumber()
	expectTypeOf(data.level).toBeNumber()
	expect(data.weeklyExp).toBeDefined()
	expectTypeOf(data.weeklyExp!).toBeNumber()
})

test("The client should be able to get multiple user's levels at once", async () => {
	const data = await client.getBulkUserLevel(guildId, [userId, secondUserId])
	expect(data).toBeDefined()
	expect(data.total_members).toBe(2)
	expect(data.queried_members).toBe(2)
	expectTypeOf(data.members).toBeArray()
	expect(data.members).toHaveLength(2)
	expect(data.members[0].id).toBe(userId)
	expect(data.members[1].id).toBe(secondUserId)
})

test("The client should be able to get a leaderboard", async () => {
	const data = await client.getLeaderboard(guildId)
	expect(data).toBeDefined()
	expectTypeOf(data.count).toBeNumber()
	expectTypeOf(data.total_count).toBeNumber()
	expectTypeOf(data.data).toBeArray()
	expect(data.data).toHaveLength(data.count)
	expect(data.data[0]).toHaveProperty("id")
	expect(data.data[0]).toHaveProperty("exp")
})

test("The client should be able to get a raw leaderboard", async () => {
	const data = await client.getRawLeaderboard(guildId)
	expect(data).toBeDefined()
	expectTypeOf(data.count).toBeNumber()
	expectTypeOf(data.data).toBeArray()
	expect(data.data).toHaveLength(data.count)
	expect(data.data[0]).toHaveProperty("id")
	expect(data.data[0]).toHaveProperty("exp")
	expectTypeOf(data.data[0].id).toBeString()
	expectTypeOf(data.data[0].exp).toBeNumber()
})

test("The client should be able to get a weekly leaderboard", async () => {
	const data = await client.getWeeklyLeaderboard(guildId)
	expect(data).toBeDefined()
	expectTypeOf(data.count).toBeNumber()
	expectTypeOf(data.total_count).toBeNumber()
	expectTypeOf(data.data).toBeArray()
	expect(data.data).toHaveLength(data.count)
	expect(data.data[0]).toHaveProperty("id")
	expect(data.data[0]).toHaveProperty("exp")
	expectTypeOf(data.data[0].id).toBeString()
	expectTypeOf(data.data[0].exp).toBeNumber()
})

test("The client should be able to get a raw weekly leaderboard", async () => {
	const data = await client.getRawWeeklyLeaderboard(guildId)
	expect(data).toBeDefined()
	expectTypeOf(data.count).toBeNumber()
	expectTypeOf(data.data).toBeArray()
	expect(data.data).toHaveLength(data.count)
	expect(data.data[0]).toHaveProperty("id")
	expect(data.data[0]).toHaveProperty("exp")
	expectTypeOf(data.data[0].id).toBeString()
	expectTypeOf(data.data[0].exp).toBeNumber()
})

test("The client should be able to get a combined leaderboard", async () => {
	const data = await client.getCombinedLeaderboard(guildId)
	expect(data).toBeDefined()
	expectTypeOf(data.count).toBeNumber()
	expect(data.count).toBe(data.data.length)
	expectTypeOf(data.data).toBeArray()
	expect(data.data).toHaveLength(data.count)
	expect(data.data[0]).toHaveProperty("id")
	expect(data.data[0]).toHaveProperty("exp")
	expect(data.data[0]).toHaveProperty("weeklyExp")
	expectTypeOf(data.data[0].id).toBeString()
	expectTypeOf(data.data[0].exp).toBeNumber()
	expectTypeOf(data.data[0].weeklyExp!).toBeNumber()
})

test("The client should be able to get a guild's rewards", async () => {
	const data = await client.getGuildRewards(guildId)
	expect(data).toBeDefined()
	expectTypeOf(data.count).toBeNumber()
	expectTypeOf(data.data).toBeArray()
	expect(data.data).toHaveLength(data.count)
	expect(data.data[0]).toHaveProperty("roleID")
	expect(data.data[0]).toHaveProperty("level")
	expectTypeOf(data.data[0].roleID).toBeString()
	expectTypeOf(data.data[0].level).toBeNumber()
})

test("The client should be able to get a user's leaderboard position", async () => {
	const leaderboard = await client.getLeaderboard(guildId)
	const position = await client.getLeaderboardPosition(guildId, userId)
	expect(position).toBeDefined()
	expectTypeOf(position).toBeNumber()
	expect(position).toBe(leaderboard.data.findIndex((member) => member.id === userId) + 1)
})

test("The client should be able to get a user's weekly leaderboard position", async () => {
	const leaderboard = await client.getWeeklyLeaderboard(guildId)
	const position = await client.getWeeklyLeaderboardPosition(guildId, userId)
	expect(position).toBeDefined()
	expectTypeOf(position).toBeNumber()
	expect(position).toBe(leaderboard.data.findIndex((member) => member.id === userId) + 1)
})

test("The client should calculate the correct level from exp", () => {
	const xp3 = client.getNextLevelExp(3)
	expect(xp3).toBe(215)

	const xp15 = client.getNextLevelExp(15)
	expect(xp15).toBe(4535)

	const xp70 = client.getNextLevelExp(70)
	expect(xp70).toBe(98035)
})


test("Custom fetch functions should work", async () => {
	const customClient = new AmariBot(apiKey, {
		customFetch: async (url: string, options: RequestInit) => {
			const res = await fetch(url, options)
			return res
		}
	})

	const data = await customClient.getUserLevel(guildId, userId)
	expect(data).toBeDefined()
	expect(data.id).toBe(userId)
})