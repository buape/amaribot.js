This is a simple example of a bot that can display the top 3 people on the leaderboard

```js
const { Client } = require("discord.js")
const amaribotjs = require("amaribot.js")

client.login("TOKEN")
const AmariBot = new amaribotjs.AmariBot("AMARIBOTAPITOKEN")

client.on("message", async () => {
    if (message.content == "what is the leaderboard") {
        let lb = await AmariBot.getGuildLeaderboard(message.guild.id)
        message.channel.send(`${lb.data[0].username} is in first place with ${lb.data[0].exp} exp at level ${lb.data[0].level}`)
        message.channel.send(`${lb.data[1].username} is in second place with ${lb.data[1].exp} exp at level ${lb.data[1].level}`)
        message.channel.send(`${lb.data[2].username} is in third place with ${lb.data[2].exp} exp at level ${lb.data[2].level}`)
    }
})
```

This is a simple example of a script that can display the top 3 people on the leaderboard

```js
const { AmariBot } = require("amaribot.js")
const AmariBot = new AmariBot("AMARIBOTAPITOKEN")
const guild = "346474194394939393"

const run = async () => {
        let lb = await AmariBot.getGuildLeaderboard(guild)
        console.log(`${lb.data[0].username} is in first place with ${lb.data[0].exp} exp at level ${lb.data[0].level}`)
        console.log(`${lb.data[1].username} is in second place with ${lb.data[1].exp} exp at level ${lb.data[1].level}`)
        console.log(`${lb.data[2].username} is in third place with ${lb.data[2].exp} exp at level ${lb.data[2].level}`)
}

run()
```
