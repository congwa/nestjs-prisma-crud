import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateMenuRequest, MenuResponse } from './models';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOkResponse({ type: MenuResponse, isArray: true })
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MenuResponse })
  async findById(@Param('id') id: number): Promise<Menu | null> {
    return this.menuService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: MenuResponse })
  async create(@Body() data: UpdateMenuRequest): Promise<Menu> {
    return this.menuService.create(data);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: MenuResponse })
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: number,
    @Body() data: UpdateMenuRequest,
  ): Promise<Menu> {
    return this.menuService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: MenuResponse })
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: number): Promise<Menu> {
    return this.menuService.delete(id);
  }
}
