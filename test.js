const expect = require("expect.js")
const { User, Leaderboard, Rewards } = require("./src/structures")

const amaribot = require("./src")
const client = new amaribot.Client(process.env.amaribot)

const guildId = "346474194394939393"
const userId = "439223656200273932"

describe("getUserLevel", async () => {
    let user
    it(`should return a User`, async () => {
        user = await client.getUserLevel(guildId, userId)
        expect(user).to.be.a(User)
    }).timeout(15000)
    it(`should have vaild pieces of the User`, async () => {
        expect(user.exp).to.be.a("string")
        expect(user.id).to.be.a("string")
        expect(user.username).to.be.a("string")
        expect(user.level).to.be.a("number")
    })
})

describe("getGuildLeaderboard", async (done) => {
    let lb
    it(`should return a Leaderboard`, async () => {
        lb = await client.getGuildLeaderboard(guildId)
        expect(lb).to.be.a(Leaderboard)
    }).timeout(15000)
    it(`should have vaild pieces of the Leaderboard`, async () => {
        expect(lb.count).to.be.a("number")
        expect(lb.totalCount).to.be.a("number")
        expect(lb.id).to.be.a("string")
        expect(lb.data).to.be.an("array")
        expect(lb.data[0]).to.be.a(User)
    })
})


describe("getWeeklyLeaderboard", async (done) => {
    let lb
    it(`should return a Leaderboard`, async () => {
        lb = await client.getWeeklyLeaderboard(guildId)
        expect(lb).to.be.a(Leaderboard)
    }).timeout(15000)
    it(`should have vaild pieces of the Leaderboard`, async () => {
        expect(lb.count).to.be.a("number")
        expect(lb.totalCount).to.be.a("number")
        expect(lb.id).to.be.a("string")
        expect(lb.data).to.be.an("array")
        expect(lb.data[0]).to.be.a(User)
    })
})

describe("getGuildRewards", async (done) => {
    let rewards
    it(`should return a Rewards`, async () => {
        rewards = await client.getGuildRewards(guildId)
        console.log(rewards)
        expect(rewards).to.be.a(Rewards)
    }).timeout(15000)
    it(`should have vaild pieces of the Rewards`, async () => {
        expect(rewards.count).to.be.a("number")
        expect(rewards.roles).to.be.a(Map)
    })
})


