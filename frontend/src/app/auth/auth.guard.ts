import { SigninApproved } from './auth.action';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanLoad,
	Route,
	UrlSegment,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const USERNAME = 'username';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private authService: AuthService, private router: Router, private store: Store) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const a = this.authService.isAuthenicated();
		if (a) {
			this.authService.isAuthenticatedObs.next(true);
			this.store.dispatch(new SigninApproved(true, this.getUsername()));
			if (state.url === '/auth/login') {
				this.router.navigate([ '/home' ]);
			}
			return true;
		} else {
			this.authService.isAuthenticatedObs.next(false);
			if (state.url === '/auth/login') {
				return true;
			} else {
				this.router.navigate([ '/auth/login' ]);
			}
			return true;
		}
	}
	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		const a = this.authService.isAuthenicated();
		if (a) {
			this.router.navigate([ '/home' ]);
			return false;
		} else {
			return true;
		}
	}

	private getUsername(): string {
		const username = localStorage.getItem(USERNAME);
		return username;
	}
}
