/** The rewards from a guild's config
 * @property {string} id - The guild's Discord ID
 * @property {number} count - The count of rewards the guild has
 * @property {Map<number, string>} roles A Map of the role rewards in the guild. The key is the level, and the value is the role ID
 */
class Rewards {
    /**
     *
     * @constructs Rewards
     * @description This is set of the Rewards from a guild
     */
    constructor(inputData = {}) {
        this.id = inputData.id
        this.count = inputData.count
        this.roles = inputData.data.reduce(
            (map, v) => map.set(v.level, v.roleId),
            new Map()
        );

        /**
         * @private
         * @description Raw data from the API
         * @type {object}
         */
        Object.defineProperty(this, "rawData", { value: inputData })
    }
}

module.exports = Rewards
