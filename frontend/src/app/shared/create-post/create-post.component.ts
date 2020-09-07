import { HomePosts } from './../../home/home.action';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: [ './create-post.component.css' ]
})
export class CreatePostComponent implements OnInit {
	body: string;
	constructor(private store: Store) {}

	ngOnInit(): void {}

	addPost(): void {
		this.store.dispatch(new HomePosts.AddPost(this.body));
	}
}
