import { Observable } from 'rxjs';
import { API_URL } from './../constant';
import { IProfile } from './profile.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ProfileService {
	constructor(private http: HttpClient) {}
	async fetchProfile(username: string): Promise<IProfile> {
		const p = await this.http.get<IProfile>(API_URL + 'users/' + username).toPromise();
		return p;
	}

	// tslint:disable-next-line: ban-types
	async follow(username: string): Promise<Object> {
		return this.http.post(API_URL + 'social/follow/' + username, {}).toPromise();
	}

	// tslint:disable-next-line: ban-types
	async unfollow(username: string): Promise<Object> {
		return this.http.delete(API_URL + 'social/follow/' + username, {}).toPromise();
	}

	async isFollowed(username: string): Promise<boolean> {
		return this.http.get<boolean>(API_URL + 'social/isfollow/' + username).toPromise();
	}
}
