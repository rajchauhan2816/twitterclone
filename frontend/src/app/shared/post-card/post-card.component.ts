import { PostRepository } from './../repositories/post.repository';
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
	createdAt = '';
	constructor(private postRepo: PostRepository) {}
	@Input() post: IPostData;
	myLike: ILike;
	ngOnInit(): void {
		this.isLiked = this.post.isLiked;
		this.likesCount = this.post.like.length;
		this.commentCount = this.post.comment.length;
		this.myLike = this.post.myLike;
		this.createdAt = new Date(this.post.post.createdAt).toDateString();
	}

	onReply(): void {
		this.canReply = true;
	}

	onLiked(): void {
		this.isLiked = !this.isLiked;
		try {
			if (this.isLiked) {
				this.likesCount++;
				this.postRepo.likePost(this.post.post._id);
			} else {
				if (this.myLike) {
					this.likesCount--;
					this.postRepo.unlikePost(this.post.myLike._id);
				}
			}
		} catch (error) {
			if (this.isLiked) {
				this.likesCount--;
			} else {
				if (this.myLike) {
					this.likesCount++;
				}
			}
		}
	}

	onHandleClose(): void {
		this.canReply = false;
	}
}
