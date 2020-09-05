import { PostModel } from './models/post.model';
import { Comment } from './schemas/comment.schema';
import { Like } from './schemas/like.schema';
import { User } from './../users/user.schema';
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { exception } from 'console';

@Injectable()
export class PostsService {
	constructor(
		@InjectModel('user') private userModel: Model<User>,
		@InjectModel('post') private postModel: Model<Post>,
        @InjectModel('comment') private commentModel: Model<Comment>,
        @InjectModel('like') private likeModel: Model<Like>,
	) {}

	async addPost(body: string, username: string) {
		const user = await this.userModel.findOne({ username });
		const post = await this.postModel.create({
			body,
			user: user._id
		});
		return post;
	}

	async findAll() {
		const result: PostModel[] = [];
		const posts = await this.postModel.find();
		for (const post of posts) {
			const like = await this.likeModel.find({
				content: post._id,
				type: 'post'
			});
			const comment = await this.commentModel.find({
				content: post._id,
				type: 'post'
			});
			result.push({
				post,
				like,
				comment
			});
		}
		return result;
	}

	async findOne(postId: string){
        const post = await this.postModel.findById(postId);
        if(!post) throw new NotFoundException();
        return post;
	}
	
	async deletePost(postId: string){
		const post = await this.postModel.findByIdAndDelete(postId);
		if(!post) throw new NotFoundException();
        return post;
	}
}
