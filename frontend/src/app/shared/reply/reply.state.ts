import { PostRepository } from './../repositories/post.repository';
import { IComment } from './../../Interface/post.model';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Reply } from './reply.action';

export class ReplyStateModel {
	loading: boolean;
	comments: IComment[];
}

@Injectable()
@State<ReplyStateModel>({
	name: 'replystate',
	defaults: {
		loading: false,
		comments: []
	}
})
export class ReplyState {
	constructor(private postRepo: PostRepository) {}

	@Action(Reply.GetAll)
	async getReplies({ dispatch, patchState }: StateContext<ReplyStateModel>, { postId }: Reply.GetAll): Promise<void> {
		patchState({
			loading: true
		});
		try {
			const comments = await this.postRepo.fetchAllComments(postId);
			dispatch(new Reply.Loaded(comments));
		} catch (error) {
			dispatch(new Reply.Error(error));
		}
	}

	@Action(Reply.Add)
	async addReply(
		{ dispatch, patchState, getState }: StateContext<ReplyStateModel>,
		{ postId, body }: Reply.Add
	): Promise<void> {
		patchState({
			loading: true
		});
		try {
			const comment = await this.postRepo.addComment(postId, body);

			const state = getState();
			dispatch(new Reply.Loaded([ ...state.comments, comment ]));
		} catch (error) {
			console.log(error);
			dispatch(new Reply.Error(error));
		}
	}

	@Action(Reply.Loaded)
	repliesLoaded({ patchState }: StateContext<ReplyStateModel>, { comments }: Reply.Loaded): void {
		patchState({
			loading: false,
			comments
		});
	}
}
