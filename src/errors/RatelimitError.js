const ms = require("ms")

/**
 * @extends Error
 * @property {string} name The type of error (RatelimitError)
 * @property {number} status HTTP status of the error
 * @property {number} remaining The time remaining for your ratelimit to expire in milliseconds
 * @property {string} message The message of this error
 */

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