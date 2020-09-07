import { HomeService } from './home.service';
import { IPost, IPostData } from './../Interface/post.model';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({ 
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

	postsSub: Subscription;

	posts: IPostData[];

	constructor(private homeService: HomeService) {}

	ngOnInit(): void {
		this.postsSub = this.homeService.postAdded.subscribe((posts: IPostData[]) => {
			this.posts = posts;
		});
		this.homeService.fetchAllPost().subscribe();
	}
}
