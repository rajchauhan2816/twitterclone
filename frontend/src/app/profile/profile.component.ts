import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';
import { IProfile } from './profile.model';
import { ActivatedRoute, Params } from '@angular/router';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { IPostData } from '../Interface/post.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
	profile$: Observable<IProfile>;
	post$: Observable<IPostData[]>;
	constructor(private profileService: ProfileService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			const username = params['username'];
			this.profile$ = this.profileService.fetchProfile(username);
			this.post$ = this.profileService.fetchPost();
			this.profile$.subscribe();
			this.post$.subscribe();
		});
	}
}
