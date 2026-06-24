import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface UploadedFileInfo {
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  path: string;
}

@Injectable()
export class FilesService {
  private readonly uploadRoot: string;

  constructor(private config: ConfigService) {
    this.uploadRoot = this.config.get('UPLOAD_DIR', './uploads');
    this.ensureDir(this.uploadRoot);
  }

  async saveFile(
    file: Express.Multer.File,
    folder = 'general',
  ): Promise<UploadedFileInfo> {
    if (!file) throw new BadRequestException('No file provided');

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
      'image/gif',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`File type ${file.mimetype} not allowed`);
    }

    const maxSize = parseInt(this.config.get('MAX_UPLOAD_SIZE', '10485760'), 10);
    if (file.size > maxSize) {
      throw new BadRequestException('File exceeds maximum upload size');
    }

    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
    const targetDir = path.join(this.uploadRoot, safeFolder);
    this.ensureDir(targetDir);

    const ext = path.extname(file.originalname);
    const fileName = `${uuidv4()}${ext}`;
    const filePath = path.join(targetDir, fileName);

    await fs.promises.writeFile(filePath, file.buffer);

    const baseUrl = this.config.get('UPLOAD_BASE_URL', '/uploads');
    const url = `${baseUrl}/${safeFolder}/${fileName}`;

    return {
      fileName,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url,
      path: filePath,
    };
  }

  async deleteFile(relativePath: string): Promise<{ message: string }> {
    const fullPath = path.join(this.uploadRoot, relativePath);
    if (!fullPath.startsWith(path.resolve(this.uploadRoot))) {
      throw new BadRequestException('Invalid file path');
    }

    try {
      await fs.promises.unlink(fullPath);
      return { message: 'File deleted' };
    } catch {
      throw new NotFoundException('File not found');
    }
  }

  getUploadRoot(): string {
    return this.uploadRoot;
  }

  private ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}
