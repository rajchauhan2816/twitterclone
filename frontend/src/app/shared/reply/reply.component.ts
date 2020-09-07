import { Observable } from 'rxjs';
import { ReplyState, ReplyStateModel } from './reply.state';
import { Store, Select } from '@ngxs/store';
import { IPostData, IComment } from './../../Interface/post.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Reply } from './reply.action';

@Component({
	selector: 'app-reply',
	templateUrl: './reply.component.html',
	styleUrls: [ './reply.component.css' ]
})
export class ReplyComponent implements OnInit {
	@Output() closereply = new EventEmitter<void>();

	@Input() post: IPostData;

	body: string;

	comments: IComment[];

	@Select(ReplyState) comments$: Observable<ReplyStateModel>;

	constructor(private store: Store) {}
	ngOnInit(): void {
		this.store.dispatch(new Reply.GetAll(this.post.post._id));
		this.comments$.subscribe((val) => (this.comments = val.comments));
	}

	onClose(): void {
		this.closereply.emit();
	}

	onReplySubmit(): void {
		this.store.dispatch(new Reply.Add(this.post.post._id, this.body));
	}
}
