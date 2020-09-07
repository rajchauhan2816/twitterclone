import { Observable } from 'rxjs';
import { IPostData } from './../Interface/post.model';
import { API_URL } from './../constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExploreService {
	constructor(private http: HttpClient) {}
	fetchPost(): Observable<IPostData[]> {
		return this.http.get<IPostData[]>(API_URL + `posts/${JSON.stringify({ type: 'explore' })}`);
	}
}
