import { Injectable } from '@nestjs/common';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import { join, dirname, extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/app.config';
import Image from 'src/utils/enities/Image.entity';

@Injectable()
export class FilesService {
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
    const thumbnailUrl = await this.resizeImageAndSave(file, folder, 640, 640);
    return { url, thumbnailUrl };
  }

  async deleteImage(image: Image): Promise<void> {
    await this.deleteFile(image.url);
    await this.deleteFile(image.thumbnailUrl);
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const filePath = join(
      process.cwd(),
      this.configService.get<AppConfig>('appConfig')!.uploadsPath,
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
    const resizedBuffer = await sharp(file.buffer)
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
      this.configService.get<AppConfig>('appConfig')!.uploadsPath,
    );
    const outputPath = join(uploadPath, folder, fileName);

    if (!existsSync(dirname(outputPath))) {
      mkdirSync(dirname(outputPath), { recursive: true });
    }

    writeFileSync(outputPath, buffer);

    return url.replace(/\\/g, '/');
  }
}
