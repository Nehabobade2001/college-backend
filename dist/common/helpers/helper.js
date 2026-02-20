"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidExtensions = exports.convertToLocalTime = exports.formatIndian = exports.getDateTime = exports.capitalized = exports.formatDate = exports.isValid = exports.deleteFile = exports.moveFile = exports.isUploadFile = exports.isTempFile = void 0;
exports.createSmartUnion = createSmartUnion;
const fs_1 = require("fs");
const luxon_1 = require("luxon");
const path_1 = require("path");
const Handlebars = require('handlebars');
const graphql_1 = require("@nestjs/graphql");
const isTempFile = (url) => url.startsWith('/public/temp');
exports.isTempFile = isTempFile;
const isUploadFile = (url) => url.startsWith('/public/uploads');
exports.isUploadFile = isUploadFile;
const moveFile = async (oldPath) => {
    try {
        const file = oldPath.split('/');
        const fileName = file[file.length - 1];
        const oldFilePath = (0, path_1.join)(__dirname, '../../../../gateway/public/temp', fileName);
        const newFilePath = (0, path_1.join)(__dirname, '../../../../gateway/public/uploads', fileName);
        console.log('Moving file:', { oldFilePath, newFilePath });
        (0, fs_1.renameSync)(oldFilePath, newFilePath);
        return `/public/uploads/${fileName}`;
    }
    catch (error) {
        console.error('Error moving file:', error);
        throw new Error('Failed to move file');
    }
};
exports.moveFile = moveFile;
const deleteFile = (path) => {
    console.log((0, path_1.join)(process.cwd(), path), 'path');
    (0, fs_1.unlinkSync)((0, path_1.join)(process.cwd(), path));
};
exports.deleteFile = deleteFile;
const isValid = (value) => {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string' && value.trim() === '') {
        return false;
    }
    if (typeof value === 'number' && isNaN(value)) {
        return false;
    }
    return true;
};
exports.isValid = isValid;
const formatDate = (date, format) => {
    return luxon_1.DateTime.fromJSDate(date).toFormat(format);
};
exports.formatDate = formatDate;
const capitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.capitalized = capitalized;
const getDateTime = (date) => {
    const currentDateWithTime = luxon_1.DateTime.now();
    return currentDateWithTime
        .set({
        year: luxon_1.DateTime.fromISO(date).year,
        month: luxon_1.DateTime.fromISO(date).month,
        day: luxon_1.DateTime.fromISO(date).day,
    })
        .toJSDate();
};
exports.getDateTime = getDateTime;
const formatIndian = (number, currency = false) => {
    return number?.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: currency ? 'currency' : 'decimal',
        currency: 'INR',
    });
};
exports.formatIndian = formatIndian;
Handlebars.registerHelper('increment', function (index) {
    return index + 1;
});
Handlebars.registerHelper('formatIndian', function (number, currency = false) {
    return (0, exports.formatIndian)(number, currency);
});
const convertToLocalTime = (timestamp) => {
    return luxon_1.DateTime.fromMillis(timestamp).toLocal().toISO();
};
exports.convertToLocalTime = convertToLocalTime;
const isValidExtensions = (ext, allowedExtensions) => {
    return allowedExtensions.includes(ext);
};
exports.isValidExtensions = isValidExtensions;
function createSmartUnion(name, singleType, arrayType, arrayKey = 'items', itemKey = 'id') {
    return (0, graphql_1.createUnionType)({
        name,
        types: () => [singleType(), arrayType()],
        resolveType(value) {
            if (Array.isArray(value?.[arrayKey]))
                return arrayType();
            if (value?.[itemKey])
                return singleType();
            return null;
        },
    });
}
//# sourceMappingURL=helper.js.map