import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { getConfig } from 'src/config';

const config = getConfig();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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
      const existedUser = await this.userService.getByEmail(email);

      if (existedUser) {
        throw new UnauthorizedException();
      }

      const hashedPassword = await hash(password, 12);

      const user = await this.userService.saveUser({
        id: existedUser?.id,
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
        secret: config.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: config.JWT_REFRESH_SECRET,
        expiresIn: '1d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
