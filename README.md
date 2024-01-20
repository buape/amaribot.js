# amaribot.js

<img src="https://amaribot.com/static/media/Flowers.116aee2b.png" alt="Logo" width="200"/>

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/amaribot/amaribot.js/test.yml?style=for-the-badge) [![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/amaribot.js?style=for-the-badge)](https://libraries.io/npm/amaribot.js) [![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/amaribot.js?style=for-the-badge)](https://snyk.io/)

[![node-current](https://img.shields.io/node/v/amaribot.js?style=for-the-badge)](https://nodejs.org/en/) [![GitHub contributors](https://img.shields.io/github/contributors/amaribot/amaribot.js?style=for-the-badge)](https://github.com/amaribot-js/amaribot.js/graphs/contributors) [![npm](https://img.shields.io/npm/dt/amaribot.js?style=for-the-badge)](https://www.npmjs.com/package/amaribot.js)

## Installation

```bash
npm install amaribot.js
```

## Documentation

The full documentation for this library can be found at [https://amaribot.js.org](https://amaribot.js.org)

## Example

```js
const { AmariBot } = require("amaribot.js")
const client = new AmariBot("APIKEY")

const data = client.getUserLevel("guild", "user")

console.log(`${data.id} has ${data.exp} experience and is level ${data.level}`)
```

## Support

If you have any questions or need assistance with this module, go to the [AmariBot Support Server](https://discord.gg/kqefESMzQj) and ping **@4shadowed** in the [#amaribot.js](https://discord.com/channels/1133726490001940532/1133773051918569482) channel!
