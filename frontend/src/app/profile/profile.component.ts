import { ProfileService } from './profile.service';
import { ProfilePostState, ProfilePostStateModel, ProfileState, ProfileStateModel } from './profile.state';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IProfile } from './profile.model';
import { ActivatedRoute, Params } from '@angular/router';
import { IPostData } from '../Interface/post.model';
import { ProfilePosts, Profile } from './profile.action';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
	posts: IPostData[] = [];
	profile: IProfile;
	showBtn = false;
	isfollowed = false;
	followersCount = 0;

	username = '';

	isLoading = false;
	@Select(ProfilePostState) posts$: Observable<ProfilePostStateModel>;
	@Select(ProfileState) profile$: Observable<ProfileStateModel>;
	constructor(private store: Store, private route: ActivatedRoute, private profileService: ProfileService) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			// tslint:disable-next-line: no-string-literal
			this.username = params['username'];
			this.store.dispatch(new ProfilePosts.GetAll('profile', this.username));
			this.store.dispatch(new Profile.Get(this.username));
			this.posts$.subscribe((val) => {
				this.isLoading = val.loading;
				this.posts = val.posts;
				
			});
			this.profile$.subscribe((val) => {
				this.profile = val.profile;
				this.showBtn = val.myProfile;
				if (val.profile?.followersCount) {
					this.followersCount = val.profile.followersCount;
				}
			});

			this.profileService.isFollowed(this.username).then((val) => (this.isfollowed = val));
		});
	}

	async follow() {
		this.isfollowed = true;
		this.followersCount++;
		await this.profileService.follow(this.username);
	}

	async unfollow() {
		this.isfollowed = false;
		this.followersCount--;
		await this.profileService.unfollow(this.username);
	}
}
