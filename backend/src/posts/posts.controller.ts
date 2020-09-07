import { LikeDTO } from './dtos/like.dto';
import { ICurrentUser } from './../auth/currentuser';
import { PostsService } from './posts.service';
import { CreatePostDTO, GetPostDTO } from './dtos/post.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
	constructor(private postService: PostsService) {}

	@Post()
	add(@Body() postDto: CreatePostDTO, @Request() { user }: ICurrentUser) {
		return this.postService.addPost(postDto.body, user.username);
	}

	@Get(':params')
	findAll(@Param('params') params: any, @Request() { user }: ICurrentUser) {
		const paramsJson = JSON.parse(params);
		if(paramsJson.type == 'explore'){
			return this.postService.findAll(user.username);
		}
		if(paramsJson.type == 'home'){
			return this.postService.findHomePost(user.username);
		}
		if(paramsJson.type == 'profile'){
			return this.postService.findmyPost(user.username);
		}
		
	}

	@Delete(':id')
	delete(@Param() { id }) {
		return this.postService.deletePost(id);
	}

	// @Get(':id')
	// findOne(@Param() { id }) {
	// 	return this.postService.findOne(id);
	// }
}
