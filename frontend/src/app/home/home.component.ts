import { HomeState, HomeStateModel } from './home.state';
import { Store, Select } from '@ngxs/store';
import { IPostData } from './../Interface/post.model';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HomePosts } from './home.action';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	posts: IPostData[];

	isLoading = false;
	@Select(HomeState) posts$: Observable<HomeStateModel>;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(new HomePosts.GetAll('home'));
		this.posts$.subscribe((val) => {
			this.posts = val.posts;
			this.isLoading = val.loading;
		});
	}
}
