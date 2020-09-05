import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '60s' }
			}),
			imports: [ ConfigModule ]
		})
	],
	controllers: [ AuthController, PassportModule ],
	providers: [ AuthService, LocalStrategy, JwtStrategy ],
	exports: [ AuthService ]
})
export class AuthModule {}
