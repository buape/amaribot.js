const User = require("./User")

class Leaderboard {
    /**
     *
     * @constructs Leaderboard
     * @description This is a Leaderboard that is returned from the API
     */
    constructor(inputData = {}) {
        /**
         * @description The guild's Discord ID
         * @type {string}
         */
        this.id = inputData.id

        /**
         * @description The count of users returned on this page
         * @type {number}
         */
        this.count = inputData.count

        /**
         * @description The total count of users on the leaderboard
         * @type {number}
         */
        this.totalCount = inputData.total_count

        /**
         * @description The leaderboard array, where array elements are Users
         * @type {array}
         */
        this.data = []
        inputData.data.forEach(x => {
            this.data.push(new User(x))
        })

        /**
         * @private
         * @description Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: inputData })
    }

    async nextPage () {
        
    }
}

module.exports = Leaderboard