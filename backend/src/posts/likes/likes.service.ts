import { PostsService } from '../posts.service';
import { User } from '../../users/user.schema';
import { Like } from '../schemas/like.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class LikesService {
	constructor(
		@InjectModel('like') private likeModel: Model<Like>,
        @InjectModel('user') private userModel: Model<User>,
        private postService: PostsService
	) {}

	async likePost(postId: string, username: string) {
        const user = await this.userModel.findOne({ username });
        
        const post = await this.postService.findOne(postId);
        if (!post) throw new NotFoundException();
        
		let like = await this.likeModel.findOne({ content: post._id, user: user._id, type: 'post' });
        if (like) throw new HttpException('Already Like', 409);
        
        like = await this.likeModel.create({ content: post._id, user: user._id, type: 'post' });
        return like;
    }

    async unlike(likeId: string){
        const like = await this.likeModel.findByIdAndDelete(likeId);
		if(!like) throw new NotFoundException();
        return like;
    }
}
