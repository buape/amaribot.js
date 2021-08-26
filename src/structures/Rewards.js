/** The rewards from a guild's config
 * @property {string} id - The guild's Discord ID
 * @property {number} count - The count of rewards the guild has
 * @property {Map<number, string>} roles A Map of the role rewards in the guild
 */
class Rewards {
    /**
     *
     * @constructs Rewards
     * @description This is set of the Rewards from a guild
     */
    constructor(inputData = {}) {
        this.count = inputData.id
        this.count = inputData.count
        this.roles = new Map()
        inputData.data.forEach((x) => {
            this.roles.set(x.level, x.roleId)
        })

        /**
         * @private
         * @description Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: inputData })
    }
}

module.exports = Rewards
