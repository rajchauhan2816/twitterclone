import { tap, take, map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	title = 'twitterclone';

	isAuthenticated = false;

	constructor(private authService: AuthService) {}
	ngOnInit(): void {
		this.authService.autoLogin();
		this.authService.tokens.pipe(
			take(1),
			tap((user) => {
				const isAuth = !!user;
				if (isAuth) {
					this.isAuthenticated = true;
				} else {
					this.isAuthenticated = false;
				}
			})
		).subscribe();
	}
}
