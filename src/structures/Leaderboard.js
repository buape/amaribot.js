const { User } = require("./index")

class Leaderboard {
    constructor(data = {}) {
        /**
         * The guild's Discord ID
         * @type {string}
         */
        this.id = data.id

        /**
         * The count of users returned on this page
         * @type {number}
         */
        this.count = data.count

        /**
         * The total count of users on the leaderboard
         * @type {number}
         */
        this.total_count = data.total_count

        /**
         * The leaderboard array
         * @type {string}
         */
        this.leaderboard = data.leaderboard

        /**
         * Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: data })
    }

    get id() {
        return this.id
    }
}
