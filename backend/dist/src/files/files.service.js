"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
let FilesService = class FilesService {
    constructor(config) {
        this.config = config;
        this.uploadRoot = this.config.get('UPLOAD_DIR', './uploads');
        this.ensureDir(this.uploadRoot);
    }
    async saveFile(file, folder = 'general') {
        if (!file)
            throw new common_1.BadRequestException('No file provided');
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'application/pdf',
            'image/gif',
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`File type ${file.mimetype} not allowed`);
        }
        const maxSize = parseInt(this.config.get('MAX_UPLOAD_SIZE', '10485760'), 10);
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File exceeds maximum upload size');
        }
        const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
        const targetDir = path.join(this.uploadRoot, safeFolder);
        this.ensureDir(targetDir);
        const ext = path.extname(file.originalname);
        const fileName = `${(0, uuid_1.v4)()}${ext}`;
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
    async deleteFile(relativePath) {
        const fullPath = path.join(this.uploadRoot, relativePath);
        if (!fullPath.startsWith(path.resolve(this.uploadRoot))) {
            throw new common_1.BadRequestException('Invalid file path');
        }
        try {
            await fs.promises.unlink(fullPath);
            return { message: 'File deleted' };
        }
        catch {
            throw new common_1.NotFoundException('File not found');
        }
    }
    getUploadRoot() {
        return this.uploadRoot;
    }
    ensureDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FilesService);
//# sourceMappingURL=files.service.js.map