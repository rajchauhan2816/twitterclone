export interface IUser {
	username: string;

	password: string;

	name: string;

	age: number;

	profilePicture?: string;

	likesCount?: number;

	followersCount?: number;

	followingCount?: number;
}
