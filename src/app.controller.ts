import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller('')
export class AppController {
  /**
   * Create some check methods for the health check endpoint.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  healthCheck(): Record<string, unknown> {
    return {
      status: 'OK',
    };
  }
}
