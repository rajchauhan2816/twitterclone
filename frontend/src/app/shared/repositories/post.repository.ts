import { API_URL } from './../../constant';
import { IPostData, IPost, ILike, IComment } from './../../Interface/post.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PostRepository {
	constructor(private http: HttpClient) {}

	fetchAllPost(type: string, username?: string): Promise<IPostData[]> {
		return this.http.get<IPostData[]>(API_URL + `posts/${JSON.stringify({ type, username })}`).toPromise();
	}

	addPost(body: string): Promise<IPost> {
		return this.http.post<IPost>(API_URL + 'posts', { body }).toPromise();
	}

	likePost(postId: string): Promise<ILike> {
		return this.http.post<ILike>(API_URL + 'posts/likes', { contentId: postId, type: 'post' }).toPromise();
	}

	unlikePost(postId: string): Promise<ILike> {
		return this.http.delete<ILike>(API_URL + 'posts/likes/' + postId).toPromise();
	}

	fetchAllComments(postId: string): Promise<IComment[]> {
		return this.http.get<IComment[]>(API_URL + 'posts/comments/' + postId).toPromise();
	}

	addComment(postId: string, body: string): Promise<IComment> {
		return this.http
			.post<IComment>(API_URL + 'posts/comments', {
				contentId: postId,
				body
			})
			.toPromise();
	}
}
