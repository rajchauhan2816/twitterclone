import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(username);
		if (user && user.password === pass) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.userId };
		return this._generateTokens(payload);
	}

	async refresh(refresh_token: string) {
		const payload = this.jwtService.verify(refresh_token);
		return this._generateTokens(payload);
	}

	private async _generateTokens(payload: any) {
		return {
			access_token: this.jwtService.sign(payload),
			refresh_token: this.jwtService.sign(payload, {
				expiresIn: '1h'
			})
		};
	}
}
