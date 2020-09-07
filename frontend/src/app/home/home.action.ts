import { IPostData } from './../Interface/post.model';
// tslint:disable-next-line: no-namespace
export namespace HomePosts {
	// Actions
	export class GetAll {
		static readonly type = '[Home] GetAllPosts';
		constructor(public type: string) {}
	}

	export class AddPost {
		static readonly type = '[Home] Add post';
		constructor(public body: string) {}
	}

	// Events
	export class PostsLoaded {
		static readonly type = '[Home] Post Loaded';
		constructor(public posts: IPostData[]) {}
	}

	// Events
	export class PostsError {
		static readonly type = '[Home] Post Error';
		constructor(public message: string) {}
	}
}
