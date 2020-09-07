import { API_URL } from './../constant';
import { TokenModel } from './tokes.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable, Subject } from 'rxjs';

const EXP = 'exp';
const USERNAME = 'username';
const ACCESS_TOKEN = 'accesstoken';
const REFRESH_TOKEN = 'refreshtoken';

@Injectable({ providedIn: 'root' })
export class AuthService {
	tokens = new BehaviorSubject<TokenModel>(null);
	private tokenExpirationTimer: any;

	isAuthenticatedObs = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient, private router: Router) {}

	signup(username: string, password: string, name: string, age: number) {
		return this.http
			.post<TokenModel>(API_URL + 'users', {
				username,
				password,
				name,
				age
			})
			.pipe(catchError(this.handleError))
			.toPromise();
	}

	login(username: string, password: string): Promise<TokenModel> {
		return this.http
			.post<TokenModel>(API_URL + 'auth/login', {
				username,
				password
			})
			.pipe(catchError(this.handleError))
			.toPromise();
	}

	isAuthenicated(): boolean {
		const exp = localStorage.getItem(EXP);
		const expInt = +localStorage.getItem(EXP);
		const currentTimestamp = Math.floor(Date.now() / 1000);
		const refreshtoken = localStorage.getItem(REFRESH_TOKEN);
		const accesstoken = localStorage.getItem(ACCESS_TOKEN);

		if (!refreshtoken || !accesstoken || !exp) {
			return false;
		}
		return true;
	}

	autoLogin(): void {
		const tokenData: TokenModel = JSON.parse(localStorage.getItem('tokenData'));
		if (!tokenData) {
			return;
		}
		this.tokens.next(tokenData);
		const expirationDuration = new Date(tokenData.exp).getTime() - new Date().getTime();
		// this.autoLogout(expirationDuration);
	}

	logout(): void {
		this.tokens.next(null);
		this.router.navigate([ '/auth/login' ]);
		localStorage.removeItem('tokenData');
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
	}

	autoLogout(expirationDuration: number): void {
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout();
		}, expirationDuration);
	}

	// private handleAuthentication(
	// 	username: string,
	// 	access_token: string,
	// 	refresh_token: string,
	// 	exp: number,
	// 	iat: number
	// ): void {
	// 	const expirationDate = new Date(new Date().getTime() + exp * 1000);

	// 	this.tokens.next({
	// 		username,
	// 		access_token,
	// 		refresh_token,
	// 		exp,
	// 		iat
	// 	});
	// 	// this.autoLogout(exp * 1000);
	// 	localStorage.setItem(
	// 		'tokenData',
	// 		JSON.stringify({
	// 			username,
	// 			access_token,
	// 			refresh_token,
	// 			exp,
	// 			iat
	// 		})
	// 	);
	// }

	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage = 'An unknown error occurred!';
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		}
		switch (errorRes.error.error.message) {
			case 'EMAIL_EXISTS':
				errorMessage = 'This email exists already';
				break;
			case 'EMAIL_NOT_FOUND':
				errorMessage = 'This email does not exist.';
				break;
			case 'INVALID_PASSWORD':
				errorMessage = 'This password is not correct.';
				break;
		}
		return throwError(errorMessage);
	}
}
