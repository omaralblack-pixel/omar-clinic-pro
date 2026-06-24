import { FilesService } from './files.service';
import { UploadQueryDto } from './dto/files.dto';
export declare class FilesController {
    private filesService;
    constructor(filesService: FilesService);
    upload(file: Express.Multer.File, query: UploadQueryDto): Promise<import("./files.service").UploadedFileInfo>;
    delete(folder: string, fileName: string): Promise<{
        message: string;
    }>;
}
