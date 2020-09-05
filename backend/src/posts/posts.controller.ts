import { LikeDTO } from './dtos/like.dto';
import { ICurrentUser } from './../auth/currentuser';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dtos/post.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
	constructor(private postService: PostsService) {}

	@Post('add')
	add(@Body() postDto: CreatePostDTO, @Request() { user }: ICurrentUser) {
		return this.postService.addPost(postDto.body, user.username);
	}

	@Get()
	findAll() {
		return this.postService.findAll();
	}

	@Delete(':id')
	delete(@Param() { id }) {
        return this.postService.deletePost(id);
    }

    @Get(':id')
	findOne(@Param() { id }) {
        return this.postService.findOne(id);
    }
}
