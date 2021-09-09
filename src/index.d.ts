declare module 'amaribot.js' {
	export const version: string;

	export class AmariBot {
		public token: string;
		public debug: boolean;
		public baseURL: string;
		public version: string;
		public requestHandler: RequestHandler;
		public constructor(token: string, options: AmariBotOptions);
		public getUserLevel(guildId: string, userId: string): Promise<User>;
		public getGuildLeaderboard(guildId: string, options?: GetLeaderboardOptions): Promise<Leaderboard>;
		public getRawGuildLeaderboard(guildId: string, options?: GetRawLeaderboardOptions): Promise<Leaderboard>;
		public getWeeklyLeaderboard(guildId: string, options?: GetLeaderboardOptions): Promise<Leaderboard>;
		public getRawWeeklyLeaderboard(guildId: string, options?: GetRawLeaderboardOptions): Promise<Leaderboard>;
		public getGuildRewards(guildId: string, options?: GetRewardOptions): Promise<Rewards>;
		public getLeaderboardPosition(guildId: string, userId: string, options?: GetRewardOptions): Promise<number>;
		public getLeaderboardPosition(level: number): number;
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
		public constructor(data: APILeaderboard);
		public id: string;
		public count: number;
		public totalCount: number;
		public data: User[];
		private readonly rawData: APILeaderboard;
	}

	export class Rewards {
		public constructor(data: APIRewards);
		public id: string;
		public count: number;
		public roles: Map<number, string>;
		private readonly rawData: APIRewards;
	}

	export class User {
		public constructor(data: APIUser);
		public id: string;
		public username: string;
		public exp: number;
		public level: number | undefined;
		public weeklyExp: number | undefined;
		private readonly rawData: APIUser;
	}

	export interface AmariBotOptions {
		token: string;
		debug?: boolean;
		rawRoutes?: boolean;
		baseURL?: string;
		version?: string;
	}

	export interface APILeaderboard {
		id: string;
		count: number;
		total_count?: number;
		data: APIUser[];
	}

	export interface APIRewards {
		id: string;
		count: number;
		data: APIRoleRewards;
	}

	export interface APIRoleRewards {
		level: number;
		roleId: number;
	}

	export interface APIUser {
		id: string;
		username: string;
		exp: number;
		level?: number;
		weeklyExp?: number;
	}

	export interface GetLeaderboardOptions {
		limit?: number;
		page?: number;
	}

	export interface GetRawLeaderboardOptions {
		limit?: number;
		page?: number;
	}

	export interface GetRewardOptions {
		limit?: number;
		page?: number;
	}
}