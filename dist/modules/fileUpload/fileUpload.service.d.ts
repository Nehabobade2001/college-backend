import { MultipartFile } from '@fastify/multipart';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class FileUploadService implements OnModuleInit, OnModuleDestroy {
    private tempPath;
    private cleanupInterval;
    private allowedExtensions;
    private maxFileSize;
    constructor();
    onModuleInit(): void;
    onModuleDestroy(): void;
    saveFile(file: MultipartFile): Promise<string>;
    private getFileBuffer;
    private getFileType;
    private cleanOldFiles;
}
