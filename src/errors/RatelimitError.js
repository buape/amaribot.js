const ms = require("ms")

class RatelimitError extends Error {
    constructor(response) {
        super();
        this.name = this.constructor.name;
        this.status = response.status;
        this.remaining = response.data["Ratelimit-Remaining"]
        this.message = 'You are currently ratelimited! Try again in ' + ms(this.remaining)
    }
}

module.exports = RatelimitError;