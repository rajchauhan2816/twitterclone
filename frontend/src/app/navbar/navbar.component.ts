import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent {
	username: string;

	constructor(private authService: AuthService, private router: Router) {
		this.authService.tokens.subscribe((val) => (this.username = val.username));
	}
	onClick(): void {
		this.authService.logout();
		this.authService.tokens.next(null);
	}
}
