const User = require("./User")

class Leaderboard {
    constructor(inputData = {}) {
        /**
         * The guild's Discord ID
         * @type {string}
         */
        this.id = inputData.id

        /**
         * The count of users returned on this page
         * @type {number}
         */
        this.count = inputData.count

        /**
         * The total count of users on the leaderboard
         * @type {number}
         */
        this.totalCount = inputData.total_count

        /**
         * The leaderboard array
         * Array elements are Users
         * @type {array}
         */
        this.data = []
        inputData.data.forEach(x => {
            this.data.push(new User(x))
        })

        /**
         * Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: inputData })
    }

    async nextPage () {
        
    }
}

module.exports = Leaderboard