import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger/dist'

import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'execute seed'})
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
