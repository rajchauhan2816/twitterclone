import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenModel } from './../tokes.models';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	isLoading = false;
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}
		const username = form.value.username;
		const password = form.value.password;

		let authObs: Observable<TokenModel>;

		this.isLoading = true;
		authObs = this.authService.login(username, password);
		authObs.subscribe(
			(_) => {
				this.isLoading = false;
				this.router.navigate([ '/home' ]);
			},
			(errorMessage) => {
				console.log(errorMessage);
				// this.error = errorMessage;
				// this.showErrorAlert(errorMessage);
				this.isLoading = false;
			}
		);
		form.reset();
	}
}
