import { tap, take } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

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
		this.authService.tokens.pipe(
			take(1),
			tap((tokens) => {
				this.isAuthenticated = !!tokens;
			})
		);
	}
}
