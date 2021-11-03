This is an example Discord bot to show you how to initalize the amaribot.js package and perform a request, which in this case, is [getGuildLeaderboard](/AmariBot#getGuildLeaderboard)


```js
// Initalize your packages
const { Client } = require("discord.js")
const { AmariBot } = require("./src")

// Login to Discord
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
client.login("DISCORD TOKEN")

// Login to AmariBot
const amaribot = new AmariBot("AMARIBOT TOKEN")

client.on("messageCreate", async (message) => {

    // if you ping the bot and then say "top three"
    if (message.content == `<@!${client.user.id}> top three`) {

        // get the top 3 from the leaderboard of the guild
        let lb = await amaribot.getGuildLeaderboard("346474194394939393", { limit: 3 })

        // if the leaderboard is null
        if(!lb) return message.channel.send("Leaderboard is empty")

        // format the result by mapping it to an array of formatted strings and then joining those elements together
        let result = lb.data.map((user) => `${user.username} - Level ${user.level} (${user.exp} EXP)`).join("\n")

        // send the result!
        message.channel.send({ content: result })

    }
})
```