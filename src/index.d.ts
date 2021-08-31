declare module 'amaribot.js' {
	export const version: string;

	export class AmariBot {
		public token: string;
		public debug: boolean;
		public baseURL: string;
		public version: string;
		public rawRoutes: boolean;
		public requestHandler: RequestHandler;
		public constructor(token: string, options: AmariBotOptions);
		public getUserLevel(guildId: string, userId: string): Promise<unknown>;
		public getGuildLeaderboard(guildId: string, options?: GetLeaderboardOptions): Promise<unknown>;
		public getWeeklyLeaderboard(guildId: string, options?: GetLeaderboardOptions): Promise<unknown>;
		public getGuildRewards(guildId: string, options?: GetRewardOptions): Promise<unknown>;
		public getLeaderboardPosition(guildId: string, userId: string, options?: GetRewardOptions): Promise<number>;
		private _request(endpoint: string, method?: string, query: any): Promise<any>;
	}

	export class APIError extends Error {
		public constructor(response: any);
		public name: string;
		public status: number;
		public message: string;
	}

	export class RatelimitError extends Error {
		public constructor(response: any);
		public name: string;
		public status: number;
		public remaining: number;
		public message: string;
	}

	export class RequestHandler {
		public constructor(public _client: AmariBot);
		private request(endpoint: string, method: string, query?: any, _attempts?: number): Promise<any>;
	}

	export class Leaderboard {
		public constructor(data: object);
		public id: string;
		public count: number;
		public totalCount: number;
		public data: User[];
		private readonly rawData: object;
	}

	export class Rewards {
		public constructor(data: object);
		public id: string;
		public count: number;
		public roles: Map<number, string>;
		private readonly rawData: object;
	}

	export class User {
		public constructor(data: object);
		public id: string;
		public username: string;
		public exp: number;
		public level: number | undefined;
		public weeklyExp: number | undefined;
		private readonly rawData: object;
	}

	export interface AmariBotOptions {
		token: string;
		debug?: boolean;
		rawRoutes?: boolean;
		baseURL?: string;
		version?: string;
	}

	export interface GetLeaderboardOptions {
		limit?: number;
		page?: number;
	}

	export interface GetRewardOptions {
		limit?: number;
		page?: number;
	}
}