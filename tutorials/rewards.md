This is a simple example of a bot that can display the rewards for different levels

```js
const { AmariBot } = require("amaribot.js")
const AmariBot = new AmariBot("AMARIBOTAPITOKEN")
const guild = "346474194394939393"

const run = async (level) => {
    let rewards = await AmariBot.getGuildRewards(guild)
    let level = parseInt(message.content, 10)
    let role = rewards.roles.get(level)
    if(role) console.log(`You get the <@&${role}> role at level ${level}!`)
}

run()
```
