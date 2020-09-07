import { HomePosts } from './home.action';
import { PostRepository } from './../shared/repositories/post.repository';
import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IPostData } from './../Interface/post.model';
export class HomeStateModel {
	loading: boolean;
	posts: IPostData[];
}

@Injectable()
@State<HomeStateModel>({
	name: 'home',
	defaults: {
		loading: false,
		posts: []
	}
})
export class HomeState {
	constructor(private postRepo: PostRepository) {}

	@Action(HomePosts.GetAll)
	async getAllPosts(
		{ dispatch, patchState }: StateContext<HomeStateModel>,
		{ type }: HomePosts.GetAll
	): Promise<void> {
		patchState({
			loading: true
		});
		try {
			const posts = await this.postRepo.fetchAllPost(type);
			dispatch(new HomePosts.PostsLoaded(posts));
		} catch (error) {
			dispatch(new HomePosts.PostsError(error));
		}
	}

	@Action(HomePosts.AddPost)
	async addPost({ dispatch, getState }: StateContext<HomeStateModel>, { body }: HomePosts.AddPost): Promise<void> {
		try {
			const post = await this.postRepo.addPost(body);

			const postData = {
				like: [],
				comment: [],
				myLike: null,
				isLiked: false,
				post
			};

			const state = getState();

			dispatch(new HomePosts.PostsLoaded([ ...state.posts, postData ]));
		} catch (error) {
			dispatch(new HomePosts.PostsError(error));
		}
	}

	@Action(HomePosts.PostsLoaded)
	async postsLoaded({ patchState }: StateContext<HomeStateModel>, { posts }: HomePosts.PostsLoaded): Promise<void> {
		patchState({
			loading: false,
			posts
		});
	}
}
