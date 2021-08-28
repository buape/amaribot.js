const expect = require("expect.js")
const { User, Leaderboard, Rewards } = require("./src/structures")

const amaribotjs = require("./src")
const AmariBot = new amaribotjs.AmariBot(process.env.amaribot)

const guildId = "346474194394939393"
const userId = "439223656200273932"

describe("getUserLevel", async () => {
    this.slow(250)
    let user
    it(`should return a User`, async () => {
        user = await AmariBot.getUserLevel(guildId, userId)
        expect(user).to.be.a(User)
    }).timeout(15000)
    let parts = [
        { prop: "exp", type: "number" },
        { prop: "weeklyExp", type: "number" },
        { prop: "id", type: "string" },
        { prop: "username", type: "string" },
        { prop: "level", type: "number" },
    ]
    parts.forEach((x) => {
        it(`should have a ${x.type} for the ${x.prop} property`, async () => {
            expect(user[x.prop]).to.be.a(x.type)
        })
    })
})

describe("getGuildLeaderboard", async (done) => {
    this.slow(1000)
    let lb
    it(`should return a Leaderboard`, async () => {
        lb = await AmariBot.getGuildLeaderboard(guildId)
        expect(lb).to.be.a(Leaderboard)
    }).timeout(15000)
    let parts = [
        { prop: "count", type: "number" },
        { prop: "totalCount", type: "number" },
        { prop: "id", type: "string" },
        { prop: "data", type: "array" },
    ]
    parts.forEach((x) => {
        it(`should have a ${x.type} for the ${x.prop} property`, async () => {
            expect(lb[x.prop]).to.be.a(x.type)
        })
    })
    it(`should have a vaild User for the first element of the data array`, async () => {
        expect(lb.data[0]).to.be.a(User)
    })
})

describe("getWeeklyLeaderboard", async (done) => {
    this.slow(1000)
    let lb
    it(`should return a Leaderboard`, async () => {
        lb = await AmariBot.getWeeklyLeaderboard(guildId)
        expect(lb).to.be.a(Leaderboard)
    }).timeout(15000)
    let parts = [
        { prop: "count", type: "number" },
        { prop: "totalCount", type: "number" },
        { prop: "id", type: "string" },
        { prop: "data", type: "array" },
    ]
    parts.forEach((x) => {
        it(`should have a ${x.type} for the ${x.prop} property`, async () => {
            expect(lb[x.prop]).to.be.a(x.type)
        })
    })
    it(`should have a vaild User for the first element of the data array`, async () => {
        expect(lb.data[0]).to.be.a(User)
    })
})

describe("getGuildRewards", async (done) => {
    this.slow(500)
    let rewards
    it(`should return a Rewards`, async () => {
        rewards = await AmariBot.getGuildRewards(guildId)
        expect(rewards).to.be.a(Rewards)
    }).timeout(15000)
    it(`should have a number for the count property`, async () => {
        expect(rewards.count).to.be.a("number")
    })
    it(`should have a Map for the roles property`, async () => {
        expect(rewards.roles).to.be.a(Map)
    })
})
