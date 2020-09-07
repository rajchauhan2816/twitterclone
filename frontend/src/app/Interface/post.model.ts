import { IUser } from './user.model';
export interface IPost {
	_id: string;

	body: string;

	user: IUser;
}

export interface IPostData {
	post: IPost;
	like: ILike[];
	myLike: ILike;
	comment: IComment[];
	isLiked: boolean;
}

export interface ILike {
	_id: string;

	content: string;

	type: string;

	user: IUser;
}

export interface IComment {
	_id: string;

	content: string;

	type: string;

	user: IUser;

	body: string;
}
