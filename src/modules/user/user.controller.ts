import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { constants } from 'src/config/constants';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth(constants.authPatternName)
  @Get()
  getUserData(@Request() req: any) {
    const { id: userId } = req.user;

    return this.userService.getUserData(userId);
  }
}
