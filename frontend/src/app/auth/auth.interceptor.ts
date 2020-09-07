import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders, HttpEvent } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

const ACCESS_TOKEN = 'accesstoken';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.authService.isAuthenticatedObs.pipe(
			take(1),
			exhaustMap((user) => {
				if (!user) {
					return next.handle(req);
				}
				const modifiedReq = req.clone({
					headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getFreshToken())
				});
				return next.handle(modifiedReq);
			})
		);
	}

	private getFreshToken(): string {
		const accesstoken = localStorage.getItem(ACCESS_TOKEN);
		return accesstoken;
	}
}
