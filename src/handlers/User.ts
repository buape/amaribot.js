import { BaseHandler } from "."
import { APIUser } from ".."

export class User extends BaseHandler {
	public async get(userId: string) {
		return (await this._handler.request("/user", { userId })) as APIUser
	}
}
