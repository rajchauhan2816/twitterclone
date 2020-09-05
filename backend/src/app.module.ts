import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { SocialModule } from './social/social.module';

@Module({
	imports: [ ConfigModule.forRoot(), , UsersModule, AuthModule, PostsModule, SocialModule ]
})
export class AppModule {}
