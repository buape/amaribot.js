This is a simple example of a bot that can display the rewards for different levels

```js
const { Client } = require("discord.js")
const amaribotjs = require("amaribot.js")

client.login("TOKEN")
const AmariBot = new amaribotjs.AmariBot("AMARIBOTAPITOKEN")

client.on("message", async () => {
    if (message.content.startsWith("what do I get at level")) {
        let rewards = await AmariBot.getGuildRewards(message.guild.id)
        message.content.replace("what do I get at level ", " ")
        let level = parseInt(message.content, 10)
        let role = rewards.roles.get(level)
        if(role) message.channel.send(`You get the <@&${role}> role at level ${level}!`)
    }
})
```
