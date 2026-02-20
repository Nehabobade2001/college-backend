import { FastifyReply, FastifyRequest } from 'fastify';
import { FileUploadService } from './fileUpload.service';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadMultipleFiles(request: FastifyRequest, response: FastifyReply): Promise<never>;
}
