import ms from "ms"
import { APIError, CustomResponse } from ".."

/**
 * @extends Error
 * @property {string} name The type of error (RatelimitError)
 * @property {number} status HTTP status of the error
 * @property {number} remaining The time remaining for your ratelimit to expire in milliseconds
 * @property {string} message The message of this error
 */

export class RatelimitError extends Error {
	name: string
	status: number
	remaining: number
	message: string

	constructor(response: CustomResponse, data?: APIError) {
		super()
		this.name = this.constructor.name
		this.status = response.status
		this.remaining = parseInt(response.headers.get("Ratelimit-Remaining") ?? `${Date.now()}`)
		this.message = data ? data.error : "You are currently ratelimited! Try again in " + ms(this.remaining)
	}
}
