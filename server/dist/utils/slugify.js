"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
exports.slugify = (str) => {
    return str.replace(/\s/g, '-').toLowerCase();
};
