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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadController = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const common_1 = require("@nestjs/common");
const fileUpload_service_1 = require("./fileUpload.service");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
let FileUploadController = class FileUploadController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async uploadMultipleFiles(request, response) {
        try {
            const fileIterator = request.files();
            const files = [];
            for await (const file of fileIterator) {
                if (!file) {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.NO_FILE_FOUND);
                }
                const fileUrl = await this.fileUploadService.saveFile(file);
                files.push(fileUrl);
            }
            return response.status(200).send({
                files: files,
                statusCode: 200,
                message: `${files.length > 1 ? 'Files uploaded successfully' : 'File uploaded successfully'}`,
            });
        }
        catch (error) {
            response.status(500).send({
                error: error.message,
                statusCode: 500,
            });
        }
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadMultipleFiles", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [fileUpload_service_1.FileUploadService])
], FileUploadController);
//# sourceMappingURL=fileUpload.controller.js.map