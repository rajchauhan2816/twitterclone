import { HomeService } from './../../home/home.service';
import { IPost, IPostData, ILike } from './../../Interface/post.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-post-card',
	templateUrl: './post-card.component.html',
	styleUrls: [ './post-card.component.css' ]
})
export class PostCardComponent implements OnInit {
	canReply = false;
	isLiked = false;
	likesCount: number;
	commentCount: number;
	constructor(private homeService: HomeService) {}
	@Input() post: IPostData;
	myLike: ILike;
	ngOnInit(): void {
		this.isLiked = this.post.isLiked;
		this.likesCount = this.post.like.length;
		this.commentCount = this.post.comment.length;
		this.myLike = this.post.myLike;
	}

	onReply(): void {
		this.canReply = true;
	}

	onLiked(): void {
		this.isLiked = !this.isLiked;
		if (this.isLiked) {
			this.likesCount++;
			this.homeService.likePost(this.post.post._id).subscribe((val) => (this.myLike = val), (err) => {});
		} else {
			if (this.myLike) {
				this.likesCount--;
				this.homeService.unlikePost(this.post.myLike._id).subscribe((_) => {}, (err) => {});
			}
		}
	}

	onHandleClose(): void {
		this.canReply = false;
	}
}
