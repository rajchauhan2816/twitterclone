import { IUser } from './../../Interface/user.model';
export interface IComment {
	_id: string;

	content: string;

	body: string;

	type: string;

	user: IUser;
}
