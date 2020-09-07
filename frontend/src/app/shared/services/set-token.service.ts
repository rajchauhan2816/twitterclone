import { TokenModel } from './../../auth/tokes.models';
import { Injectable } from '@angular/core';
const ACCESS_TOKEN = 'accesstoken';
const REFRESH_TOKEN = 'refreshtoken';
const EXP = 'exp';
const IAT = 'iat';
const USERNAME = 'username';

@Injectable({
	providedIn: 'root'
})
export class SetTokenService {
	constructor() {}

	storeLocal(tokens: TokenModel): void {
		localStorage.setItem(USERNAME, tokens.username);
		localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
		localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
		localStorage.setItem(EXP, tokens.exp.toString());
		localStorage.setItem(IAT, tokens.iat.toString());
	}

	removeLocal(): void {
		localStorage.removeItem(USERNAME);
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(REFRESH_TOKEN);
		localStorage.removeItem(EXP);
		localStorage.removeItem(IAT);
	}
}
