import { Store } from '@ngxs/store';
import { Signup } from './../auth.action';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.css' ]
})
export class SignupComponent implements OnInit {
	constructor(private router: Router, private store: Store) {}

	ngOnInit(): void {}

	onSubmit(form: NgForm): void {
		if (!form.valid) {
			return;
		}
		const username = form.value.username;
		const password = form.value.password;
		const name = form.value.name;
		const age = form.value.age;
		this.store.dispatch(new Signup(username, password, age, name));

		form.reset();
	}

	goLogin() {
		this.router.navigate([ 'auth/login' ]);
	}
}
