import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  async saveFile(file: any, savePath: string): Promise<void> {
    // 创建可读流
    console.log('file.path', file.path);
    const readStream = fs.createReadStream(file.path);

    // 创建可写流
    console.log('savePath', savePath);
    const writeStream = fs.createWriteStream(savePath);

    // 监听error事件，如果出现错误则关闭可写流，并删除已上传的图片
    writeStream.on('error', (error) => {
      console.log(error);
      writeStream.close();

      if (fs.existsSync(savePath)) {
        fs.unlinkSync(savePath);
      }

      throw new Error('文件上传失败');
    });

    // 将可读流的数据写入可写流
    readStream.pipe(writeStream);

    // 监听close事件，如果可写流关闭则删除可读流和上传文件
    writeStream.on('close', () => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  }
}
