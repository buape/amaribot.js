const User = require("./User")

/** A group of users from the API
 * @property {string} id - The guild's Discord ID
 * @property {number} count - The count of users found in this guild.
 * @property {number}  queriedCount - The count of users that were queried for.
 * @property {array<User>} data The user array, where array elements are Users
 */
class UserGroup {
    /**
     * @constructs UserGroup
     * @description This is a group of users that is returned from the API
     */
    constructor(inputData = {}) {
        this.id = inputData.guild
        this.count = inputData.total_members
        this.queriedCount = inputData.queried_members
        this.data = inputData.members.map(x => new User(x));

        /**
         * @private
         * @description Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: inputData })
    }
}

module.exports = UserGroup
