const { User, User } = require("./index")

module.exports = class Leaderboard {
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
         * Array elements are Users
         * @type {array}
         */
        this.leaderboard = []
        data.data.forEach(x => {
            this.leaderboard.push(new User(x))
        })

        /**
         * Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: data })
    }

    get id() {
        return this.id
    }

    async nextPage () {
        
    }
}

module.exports = Leaderboard