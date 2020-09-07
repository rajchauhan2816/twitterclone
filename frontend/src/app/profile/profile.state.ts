import { AuthService } from './../auth/auth.service';
import { ProfileService } from './profile.service';
import { IProfile } from './profile.model';
import { ProfilePosts, Profile } from './profile.action';
import { PostRepository } from './../shared/repositories/post.repository';
import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IPostData } from './../Interface/post.model';
export class ProfilePostStateModel {
	loading: boolean;
	posts: IPostData[];
}

@Injectable()
@State<ProfilePostStateModel>({
	name: 'profilepost',
	defaults: {
		loading: false,
		posts: []
	}
})
export class ProfilePostState {
	constructor(private postRepo: PostRepository) {}

	@Action(ProfilePosts.GetAll)
	async getAllPosts(
		{ dispatch, patchState }: StateContext<ProfilePostStateModel>,
		{ type, username }: ProfilePosts.GetAll
	): Promise<void> {
		patchState({
			loading: true
		});
		try {
			const posts = await this.postRepo.fetchAllPost(type, username);
			dispatch(new ProfilePosts.PostsLoaded(posts));
		} catch (error) {
			dispatch(new ProfilePosts.PostsError(error));
		}
	}

	@Action(ProfilePosts.PostsLoaded)
	async postsLoaded(
		{ patchState }: StateContext<ProfilePostStateModel>,
		{ posts }: ProfilePosts.PostsLoaded
	): Promise<void> {
		patchState({
			loading: false,
			posts
		});
	}
}

export class ProfileStateModel {
	loading: boolean;
	profile?: IProfile;
	myProfile?: boolean;
}

@Injectable()
@State<ProfileStateModel>({
	name: 'profile',
	defaults: {
		loading: false,
		myProfile: false
	}
})
export class ProfileState {
	constructor(private profileService: ProfileService, private authService: AuthService) {}

	@Action(Profile.Get)
	async getProfile(
		{ patchState, dispatch }: StateContext<ProfileStateModel>,
		{ username }: Profile.Get
	): Promise<void> {
		patchState({
			loading: true
		});

		try {
			const profile = await this.profileService.fetchProfile(username);
			const myProfile = localStorage.getItem('username') === profile.username;
			dispatch(new Profile.Loaded(profile, myProfile));
		} catch (error) {
			dispatch(new Profile.Error(error));
		}
	}

	@Action(Profile.Loaded)
	profileLoaded({ patchState }: StateContext<ProfileStateModel>, { profile, myProfile }: Profile.Loaded): void {
		patchState({
			loading: false,
			profile,
			myProfile
		});
	}
}
