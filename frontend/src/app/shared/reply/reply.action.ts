import { IComment } from './../../Interface/post.model';
// tslint:disable-next-line: no-namespace
export namespace Reply {
	export class GetAll {
		static readonly type = '[Reply] Get All Replies';
		constructor(public postId: string) {}
	}

	export class Add {
		static readonly type = '[Reply] Add reply';
		constructor(public postId: string, public body: string) {}
	}

	export class Loaded {
		static readonly type = '[Reply] Replies Loaded';
		constructor(public comments: IComment[]) {}
	}

	export class Error {
		static readonly type = '[Reply] Replies Error';
		constructor(public message: string) {}
	}
}
