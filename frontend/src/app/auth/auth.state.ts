import { TokenModel } from './tokes.models';
import { AuthService } from './auth.service';
import { SetTokenService } from '../shared/services/set-token.service';
import { Signin, SigninSuccess, SigninFailed, Signout, SigninApproved, Signup, SignupSuccess } from './auth.action';
import { State, StateContext, Action, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';

export class AuthStateModel {
	loading: boolean;
	username?: string;
}

@Injectable()
@State<AuthStateModel>({
	name: 'auth',
	defaults: {
		loading: false
	} // the name of our state
})
export class AuthState {
	constructor(private authService: AuthService, private setToken: SetTokenService) {}

	@Selector()
	static getLoading(state: AuthStateModel): boolean {
		return state.loading;
	}

	@Selector()
	static getUsername(state: AuthStateModel): string {
		return state.username;
	}

	@Action(Signin)
	async login({ dispatch, patchState }: StateContext<AuthStateModel>, { username, password }: Signin): Promise<void> {
		patchState({
			loading: true
		});
		try {
			const tokens: TokenModel = await this.authService.login(username, password);
			this.setToken.storeLocal(tokens);
			this.authService.isAuthenticatedObs.next(true);
			dispatch(new SigninSuccess(true, tokens.username));
		} catch (error) {
			dispatch(new SigninFailed(error));
		}
	}
	@Action(Signup)
	async signup(
		{ dispatch, patchState }: StateContext<AuthStateModel>,
		{ username, password, age, name }: Signup
	): Promise<void> {
		patchState({
			loading: true
		});
		try {
			const user = await this.authService.signup(username, password, name, age);
			dispatch(new SignupSuccess());
		} catch (error) {
			dispatch(new SigninFailed(error));
		}
	}

	@Action(SignupSuccess)
	onSignupSuccess(ctx: StateContext<AuthStateModel>): void {
		ctx.dispatch(new Navigate([ '/auth/login' ]));
	}

	@Action(Signout)
	logout(ctx: StateContext<AuthStateModel>): void {
		this.setToken.removeLocal();
		this.authService.isAuthenticatedObs.next(false);
		ctx.dispatch(new Navigate([ '/auth/login' ]));
	}

	@Action(SigninSuccess)
	onLoginSuccess(ctx: StateContext<AuthStateModel>): void {
		ctx.dispatch(new Navigate([ '/home' ]));
	}

	@Action(SigninSuccess)
	setUserStateOnSuccess({ patchState }: StateContext<AuthStateModel>, { username }: SigninSuccess): void {
		patchState({
			username,
			loading: false
		});
	}

	@Action(SigninApproved)
	setUserStateOnApproved({ patchState }: StateContext<AuthStateModel>, { username }: SigninSuccess): void {
		patchState({
			username,
			loading: false
		});
	}

	@Action([ SigninFailed ])
	setUserStateOnFailure({ patchState }: StateContext<AuthStateModel>): void {
		patchState({
			loading: false
		});
	}
}
