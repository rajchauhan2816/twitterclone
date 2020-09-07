import { IComment } from './../../Interface/post.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-post-card-reply',
	templateUrl: './post-card-reply.component.html',
	styleUrls: [ './post-card-reply.component.css' ]
})
export class PostCardReplyComponent implements OnInit {
	@Input() comment: IComment;

	constructor() {}

	ngOnInit(): void {}
}
