import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BannerService } from './banner.service';
// import type { Banner } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BannerResponse, UpdateBannerRequest } from './models';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  create(@Body() data: UpdateBannerRequest): Promise<BannerResponse> {
    return this.bannerService.create(data);
  }

  @Get()
  findAll(): Promise<BannerResponse[]> {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BannerResponse> {
    return this.bannerService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() data: UpdateBannerRequest,
  ): Promise<BannerResponse> {
    return this.bannerService.update(+id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string): Promise<BannerResponse> {
    return this.bannerService.remove(+id);
  }
}
