import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { EConfigKeys } from 'src/config';
import { AppConfigService } from '../appConfig/appConfig.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
  ) {}

  async loginEmail(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new UnauthorizedException();
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const tokens = await this.getTokens(payload);

    return {
      tokens,
      user: this.userService.removePasswordFromUser(user),
    };
  }

  async signupEmail(email: string, password: string) {
    try {
      const hashedPassword = await hash(password, 12);

      const user = await this.userService.saveUser({
        email,
        password: hashedPassword,
      });

      const payload = {
        id: user.id,
        username: user.username,
      };

      const tokens = await this.getTokens(payload);

      return {
        tokens,
        user: this.userService.removePasswordFromUser(user),
      };
    } catch (error) {
      throw new ConflictException();
    }
  }

  async refreshTokens(userId: number) {
    const user = await this.userService.getById(userId);
    if (!user) throw new ForbiddenException('Access Denied');

    const payload = { id: user.id, username: user.username };

    const tokens = await this.getTokens(payload);

    return tokens;
  }

  async getTokens(payload: { id: number; username: string | null }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get(EConfigKeys.JWT_ACCESS_SECRET),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get(EConfigKeys.JWT_REFRESH_SECRET),
        expiresIn: '1d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
