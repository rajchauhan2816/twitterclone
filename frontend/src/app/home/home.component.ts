import { HomeService } from './home.service';
import { IPost, IPostData } from './../Interface/post.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	cnt: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

	posts$: Observable<IPostData[]>;

	constructor(private homeService: HomeService) {}

	ngOnInit(): void {
		this.posts$ = this.homeService.fetchAllPost();
		this.posts$.subscribe((postarr) => {
			console.log(postarr);
		});
	}
}
