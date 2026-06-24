import { ConfigService } from '@nestjs/config';
export interface UploadedFileInfo {
    fileName: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    path: string;
}
export declare class FilesService {
    private config;
    private readonly uploadRoot;
    constructor(config: ConfigService);
    saveFile(file: Express.Multer.File, folder?: string): Promise<UploadedFileInfo>;
    deleteFile(relativePath: string): Promise<{
        message: string;
    }>;
    getUploadRoot(): string;
    private ensureDir;
}
