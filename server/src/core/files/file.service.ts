import { Injectable } from '@nestjs/common';
import { ConfigService } from '@salman3001/nest-config-module';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import { join, dirname, extname } from 'path';
import { Config } from '../config/config';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}

  async uploadFile(
    file: Express.Multer.File,
    folder: string = '',
  ): Promise<string> {
    const buffer = readFileSync(file.path);
    return await this.writeFile(folder, buffer, extname(file.originalname));
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string = '',
  ): Promise<{ url: string; thumbnailUrl: string }> {
    const url = await this.resizeImageAndSave(file, folder);
    const thumbnailUrl = await this.resizeImageAndSave(file, folder, 320, 240);
    return { url, thumbnailUrl };
  }

  async deleteImage(imageUrl: string, thumbnailUrl: string): Promise<void> {
    await this.deleteFile(imageUrl);
    await this.deleteFile(thumbnailUrl);
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const filePath = join(
      process.cwd(),
      this.configService.get<Config>().envs().UPLOAD_PATH,
      fileUrl,
    );
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  private async resizeImageAndSave(
    file: Express.Multer.File,
    folder: string = '',
    width?: number,
    height?: number,
  ): Promise<string> {
    const resizedBuffer = await sharp(file.path)
      .resize(width, height, { fit: 'cover' })
      .toFormat('webp')
      .toBuffer();

    return await this.writeFile(folder, resizedBuffer, 'webp');
  }

  private async writeFile(
    folder: string = '',
    buffer: Buffer,
    extName: string,
  ): Promise<string> {
    const fileName = Date.now() + uuidv4() + `.${extName}`;
    const url = join(folder, fileName);
    const uploadPath = join(
      process.cwd(),
      this.configService.get<Config>().envs().UPLOAD_PATH,
    );
    const outputPath = join(uploadPath, folder, fileName);

    if (!existsSync(dirname(outputPath))) {
      mkdirSync(dirname(outputPath), { recursive: true });
    }

    writeFileSync(outputPath, buffer);

    return url.replace(/\\/g, '/');
  }
}
