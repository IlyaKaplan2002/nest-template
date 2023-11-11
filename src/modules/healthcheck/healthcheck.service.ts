import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getHealthCheck(): { success: boolean } {
    return { success: true };
  }
}
