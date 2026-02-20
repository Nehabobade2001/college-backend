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
exports.FileUploadService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const helper_1 = require("../../common/helpers/helper");
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const promises_1 = require("stream/promises");
const file_type_1 = require("file-type");
let FileUploadService = class FileUploadService {
    constructor() {
        this.tempPath = (0, path_1.join)(__dirname, '../../../../gateway/public/temp');
        this.cleanupInterval = null;
        this.allowedExtensions = [
            'png',
            'jpg',
            'webp',
            'avif',
            'jpeg',
            'pdf',
            'xls',
            'xlsx',
            'txt',
            'doc',
            'docx',
        ];
        this.maxFileSize = 20 * 1024 * 1024;
        if (!(0, fs_1.existsSync)(this.tempPath)) {
            (0, fs_1.mkdirSync)(this.tempPath, { recursive: true });
        }
    }
    onModuleInit() {
        this.cleanupInterval = setInterval(() => this.cleanOldFiles(), 3 * 24 * 60 * 60 * 1000);
    }
    onModuleDestroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
    async saveFile(file) {
        let filePath = null;
        try {
            if (!file.filename) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.NO_FILE_FOUND);
            }
            const filename = `${Date.now()}${(0, path_1.extname)(file.filename)}`;
            filePath = (0, path_1.join)(this.tempPath, filename);
            const writeStream = (0, fs_1.createWriteStream)(filePath, { flags: 'w' });
            await (0, promises_1.pipeline)(file.file, writeStream).catch((err) => {
                throw Error(`Pipeline error: ${err}`);
            });
            const savedFileSize = (0, fs_1.statSync)(filePath).size;
            if (savedFileSize === 0) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ZERO_BYTE_FILE);
            }
            if (savedFileSize > this.maxFileSize) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_FILE_SIZE);
            }
            const fileBuffer = await this.getFileBuffer(filePath);
            const detectedType = await this.getFileType(fileBuffer);
            const ext = detectedType?.ext || (0, path_1.extname)(file.filename).replace('.', '');
            if (!(0, helper_1.isValidExtensions)(ext, this.allowedExtensions)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_FILE_TYPE, {
                    type: ext,
                    name: file.filename,
                    allowed: this.allowedExtensions.join(', '),
                });
            }
            return `/public/temp/${filename}`;
        }
        catch (error) {
            if (filePath && (0, fs_1.existsSync)(filePath)) {
                (0, fs_1.unlinkSync)(filePath);
                console.log(`Deleted partially uploaded file: ${filePath}`);
            }
            throw error;
        }
    }
    async getFileBuffer(filePath) {
        const fs = require('fs').promises;
        return fs.readFile(filePath);
    }
    async getFileType(file) {
        return (0, file_type_1.fileTypeFromBuffer)(file);
    }
    cleanOldFiles() {
        try {
            const files = (0, fs_1.readdirSync)(this.tempPath);
            const now = Date.now();
            files.forEach((file) => {
                const filePath = (0, path_1.join)(this.tempPath, file);
                const fileStat = (0, fs_1.statSync)(filePath);
                if (now - fileStat.mtime.getTime() >= 3 * 24 * 60 * 60 * 1000) {
                    try {
                        (0, fs_1.unlinkSync)(filePath);
                        console.log(`Deleted old file: ${file}`);
                    }
                    catch (err) {
                        console.error(`Error deleting file ${file}:`, err);
                    }
                }
            });
        }
        catch (err) {
            console.error('Error cleaning old files:', err);
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileUploadService);
//# sourceMappingURL=fileUpload.service.js.map