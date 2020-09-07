import { HomeService } from './../../home/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: [ './create-post.component.css' ]
})
export class CreatePostComponent implements OnInit {
	body: string;
	constructor(private homeService: HomeService) {}

	ngOnInit(): void {}

	addPost() {
		this.homeService.addPost(this.body).subscribe((post) => console.log(post));
	}
}
