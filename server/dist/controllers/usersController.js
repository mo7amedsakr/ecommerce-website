"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.getUser = exports.updateUser = exports.getAllUsers = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
exports.getAllUsers = catchAsync_1.catchAsync(async (req, res, next) => {
    const users = await typeorm_1.getRepository(User_1.User).find();
    res.status(200).json({
        status: 'success',
        data: users,
    });
});
exports.updateUser = catchAsync_1.catchAsync(async (req, res, next) => {
    if (req.body.password) {
        delete req.body.password;
    }
    const updatedUser = await typeorm_1.getRepository(User_1.User).update({ id: req.params.id }, req.body);
    console.log(exports.updateUser);
    res.status(200).json({
        status: 'success',
        data: updatedUser,
    });
});
exports.getUser = catchAsync_1.catchAsync(async (req, res, next) => {
    const user = await typeorm_1.getRepository(User_1.User).findOne({ id: req.params.id });
    if (!user) {
        return next(new appError_1.AppError('No Document.', 404));
    }
    res.status(200).json({
        status: 'success',
        data: user,
    });
});
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};
