import { Observable } from 'rxjs';
import { AuthState } from './../auth/auth.state';
import { Signout } from './../auth/auth.action';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
	username: string;

	@Select(AuthState.getUsername) username$: Observable<string>;

	constructor(private store: Store) {}
	ngOnInit(): void {
		this.username$.subscribe((val) => (this.username = val));
	}

	onClick(): void {
		this.store.dispatch(new Signout());
	}
}
