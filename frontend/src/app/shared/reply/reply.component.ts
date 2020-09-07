import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-reply',
	templateUrl: './reply.component.html',
	styleUrls: [ './reply.component.css' ]
})
export class ReplyComponent implements OnInit {
	@Output() closereply = new EventEmitter<void>();
	constructor() {}
	ngOnInit(): void {}

	onClose(): void {
		this.closereply.emit();
	}

	onReplySubmit(): void {
		// do some things to pass reply to parent
		this.onClose();
	}
}
