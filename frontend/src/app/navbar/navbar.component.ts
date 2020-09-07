import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent {
	constructor(private authService: AuthService, private router: Router) {}
	onClick(): void {
		this.authService.logout();
		this.authService.tokens.next(null);
	}
}
