"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImageName = void 0;
const generateImageName = () => {
    const timestamp = new Date()
        .toISOString()
        .replace(/:/g, '-')
        .replace(/\.\d{3}Z$/, '');
    const uniqueIdentifier = Math.random().toString(36).substring(2, 15);
    return `${timestamp}_${uniqueIdentifier}.jpg`;
};
exports.generateImageName = generateImageName;
//# sourceMappingURL=util.js.map