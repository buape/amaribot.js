const User = require("./User")

/** The leaderboard of a guild from the API
 * @property {string} id - The guild's Discord ID
 * @property {number} count - The count of users returned on this page
 * @property {number}  totalCount - The total count of users on the leaderboard. Returns the number from count if you are using the raw routes, since that information isn't given there.
 * @property {array<User>} data The leaderboard array, where array elements are Users
 */
class Leaderboard {
    /**
     * @constructs Leaderboard
     * @description This is a Leaderboard that is returned from the API
     */
    constructor(inputData = {}) {
        this.id = inputData.id
        this.count = inputData.count
        inputData.total_count ? (this.totalCount = inputData.total_count) : null
        this.data = inputData.data.map((x) => new User(x))

        /**
         * @private
         * @description Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: inputData })
    }
}

module.exports = Leaderboard
