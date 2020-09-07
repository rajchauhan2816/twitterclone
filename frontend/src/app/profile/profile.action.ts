import { IProfile } from './profile.model';
import { IPostData } from './../Interface/post.model';
// tslint:disable-next-line: no-namespace
export namespace Profile {
	// Actions

	export class Get {
		static readonly type = '[Profile] Get profile';
		constructor(public username: string) {}
	}

	// Events

	export class Loaded {
		static readonly type = '[Profile] Profile Loaded';
		constructor(public profile: IProfile, public myProfile?: boolean) {}
	}

	export class Error {
		static readonly type = '[Profile] Profile Error';
		constructor(public message: string) {}
	}
}

// tslint:disable-next-line: no-namespace
export namespace ProfilePosts {
	// Actions
	export class GetAll {
		static readonly type = '[Home] GetAllPosts';
		constructor(public type: string, public username: string) {}
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
