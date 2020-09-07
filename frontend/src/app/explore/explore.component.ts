import { ExploreService } from './explore.service';
import { IPostData } from './../Interface/post.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-explore',
	templateUrl: './explore.component.html',
	styleUrls: [ './explore.component.css' ]
})
export class ExploreComponent implements OnInit {
	post$: Observable<IPostData[]>;
	isLoading = true;
	constructor(private exploreService: ExploreService) {}

	ngOnInit(): void {
		this.post$ = this.exploreService.fetchPost();
		this.post$.subscribe((val) => {
			if (val) {
				this.isLoading = false;
			}
		});
	}
}
