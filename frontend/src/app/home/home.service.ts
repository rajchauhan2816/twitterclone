import { Observable } from 'rxjs';
import { API_URL } from './../constant';
import { IPost, IPostData, ILike } from './../Interface/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HomeService {
	constructor(private http: HttpClient) {}

	fetchAllPost(): Observable<IPostData[]> {
		return this.http.get<IPostData[]>(API_URL + 'posts');
	}

	addPost(body: string): Observable<IPost> {
		return this.http.post<IPost>(API_URL + 'posts', { body });
	}

	likePost(postId: string): Observable<ILike> {
		return this.http.post<ILike>(API_URL + 'posts/likes', { contentId: postId, type: 'post' });
	}

	unlikePost(postId: string): Observable<ILike> {
		return this.http.delete<ILike>(API_URL + 'posts/likes/' + postId);
	}
}
