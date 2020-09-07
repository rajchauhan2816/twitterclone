import { Observable } from 'rxjs';
import { IPostData } from './../Interface/post.model';
import { API_URL } from './../constant';
import { IProfile } from './profile.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ProfileService {
	constructor(private http: HttpClient) {}
	fetchProfile(username: string) {
		return this.http.get<IProfile>(API_URL + 'users/' + username);
	}
	fetchPost(): Observable<IPostData[]> {
		return this.http.get<IPostData[]>(API_URL + `posts/${JSON.stringify({ type: 'profile' })}`);
	}
}
