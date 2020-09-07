import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { API_URL } from './../constant';
import { IPost, IPostData, ILike } from './../Interface/post.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HomeService {
	postAdded = new Subject<IPostData[]>();
	posts: IPostData[] = [];
	constructor(private http: HttpClient) {}

	fetchAllPost(): Observable<IPostData[]> {
		return this.http.get<IPostData[]>(API_URL + `posts/${JSON.stringify({ type: 'home' })}`).pipe(
			tap((val) => {
				console.log('Fecting posts');
				this.posts = val;
				this.postAdded.next(val);
			})
		);
	}

	addPost(body: string): Observable<IPost> {
		return this.http.post<IPost>(API_URL + 'posts', { body }).pipe(
			tap((val) => {
				this.posts.push({
					post: val,
					like: [],
					comment: [],
					myLike: null,
					isLiked: false
				});
				console.log(this.posts);
				this.postAdded.next(this.posts.slice());
			})
		);
	}

	likePost(postId: string): Observable<ILike> {
		return this.http.post<ILike>(API_URL + 'posts/likes', { contentId: postId, type: 'post' });
	}

	unlikePost(postId: string): Observable<ILike> {
		return this.http.delete<ILike>(API_URL + 'posts/likes/' + postId);
	}
}
