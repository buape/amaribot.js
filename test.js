const expect = require("expect.js")
const { User, Leaderboard } = require("./src/structures")

const amaribot = require("./src")
const client = new amaribot.Client(process.env.amaribot)

const guildId = "346474194394939393"
const userId = "439223656200273932"

describe("getUserLevel", async () => {
    let user
    it(`should return a User`, async () => {
        user = await client.getUserLevel(guildId, userId)
        expect(user).to.be.a(User)
    })
    it(`should have vaild pieces of the User`, async () => {
        expect(user.exp).to.be.a("string")
        expect(user.id).to.be.a("string")
        expect(user.username).to.be.a("string")
        expect(user.level).to.be.a("number")
    })
})
