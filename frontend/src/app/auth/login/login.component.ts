import { Signin } from './../auth.action';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	isLoading = false;
	constructor(private store: Store, private router: Router) {}

	ngOnInit(): void {}

	onSubmit(form: NgForm): void {
		if (!form.valid) {
			return;
		}
		const username = form.value.username;
		const password = form.value.password;

		this.isLoading = true;

		this.store.dispatch(new Signin(username, password));

		form.reset();
	}

	goSignup() {
		this.router.navigate([ 'auth/signup' ]);
	}
}
