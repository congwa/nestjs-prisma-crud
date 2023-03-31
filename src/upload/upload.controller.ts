import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import * as path from 'path';
// import { v4 as uuidv4 } from 'uuid';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '上传相册图片' })
  @ApiResponse({ status: 200, description: '文件上传成功' })
  @ApiResponse({ status: 400, description: '文件上传失败' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传文件',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file): Promise<any> {
    console.log(JSON.stringify(file));

    // const uuid = uuidv4(); // 生成唯一的uuid作为文件名
    // const ext = path.extname(file.originalname); // 获取文件扩展名
    // const filename = `${uuid}${ext}`; // 拼接文件名

    // 定义文件保存路径
    // const savePath = path.join(__dirname, '..', 'public', 'uploads', filename);

    // 将文件保存到指定路径
    // await this.uploadService.saveFile(file, savePath);

    // 返回上传结果，包含文件路径等相关信息
    Logger.log('upload: ' + JSON.stringify(file));
    return {
      url: `/uploads/${file.filename}`, // 文件路径
      originalname: file.originalname, // 文件原名
      size: file.size, // 文件大小
      mimetype: file.mimetype, // 文件MIME类型
    };
  }
}
