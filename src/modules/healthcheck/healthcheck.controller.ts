import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './healthcheck.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('healthcheck')
@Controller('healthcheck')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  public getHealthCheck() {
    return this.healthCheckService.getHealthCheck();
  }
}
