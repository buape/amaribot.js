const expect = require("expect.js")
const { User, Leaderboard, Rewards, UserGroup } = require("./src/structures")

const amaribotjs = require("./src")
const AmariBot = new amaribotjs.AmariBot(process.env.amaribot)

const guildId = "346474194394939393"
const userId = "439223656200273932"

describe("getUserLevel", async () => {
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

describe("getUserLevel of multiple users", async () => {
    let user
    it(`should return a UserGroup`, async () => {
        group = await AmariBot.getUserLevel(guildId, ["107510319315697664", "249955383001481216", "439223656200273932", "69420"])
        expect(group).to.be.a(UserGroup)
    }).timeout(15000)
    let parts = [
        { prop: "id", type: "string" },
        { prop: "count", type: "number" },
        { prop: "queriedCount", type: "number" },
        { prop: "data", type: "array" }
    ]
    parts.forEach((x) => {
        it(`should have a ${x.type} for the ${x.prop} property`, async () => {
            expect(group[x.prop]).to.be.a(x.type)
        })
    })
    it(`should have an array of Users in the data`, async () => {
        expect(group.data[0]).to.be.a(User)
    })
    it(`should have one more queried count than the total count`, async () => {
        expect(group.count).to.be(3)
        expect(group.queriedCount).to.be(4)
    })
})

describe("getGuildLeaderboard", async (done) => {
    let lb
    it(`should return a Leaderboard`, async () => {
        lb = await AmariBot.getGuildLeaderboard(guildId, {limit: 69})
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
    it(`should have a length for data of 69`, async () => {
        expect(lb.data.length).to.be(69)
        expect(lb.count).to.be(69)
    })
})

describe("getWeeklyLeaderboard", async (done) => {
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
    it(`should have a string for a role in the Map`, async () => {
        expect(rewards.roles.values().next().value).to.be.a('string')
    })
    it(`should have a number for a level in the Map`, async () => {
        expect(rewards.roles.keys().next().value).to.be.a('number')
    })
})

describe("getLeaderboardPosition", async (done) => {
    let position
    it(`should return a number greater than 0`, async () => {
        position = await AmariBot.getLeaderboardPosition(guildId, userId)
        expect(position).to.be.a("number")
    })
    it(`should be greater than 0`, async () => {
        expect(position).to.be.above(0)
    })
})

describe("getLeaderboardPosition", async (done) => {
    let nextExp
    it(`should return 35 for level 0`, async () => {
        nextExp = AmariBot.getLevelExp(0)
        expect(nextExp).to.be(35)
    })
    it(`should return 55 for level 1`, async () => {
        nextExp = AmariBot.getLevelExp(1)
        expect(nextExp).to.be(55)
    })
    it(`should return 2035 for level 10`, async () => {
        nextExp = AmariBot.getLevelExp(10)
        expect(nextExp).to.be(2035)
    })
})
