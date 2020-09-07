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
		this.authService.isAuthenticatedObs.subscribe((val) => {
			console.log(val);
			this.isAuthenticated = val;
		});
	}
}
