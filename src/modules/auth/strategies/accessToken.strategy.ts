import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EConfigKeys } from 'src/config';
import { AppConfigService } from 'src/modules/appConfig/appConfig.service';

type JwtPayload = {
  id: number;
  username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(EConfigKeys.JWT_ACCESS_SECRET),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
