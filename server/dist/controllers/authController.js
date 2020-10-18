"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.restrictToAdmin = exports.protect = exports.correctPassword = exports.hashPassword = void 0;
const util_1 = require("util");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const isEmail_1 = require("../utils/isEmail");
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
exports.hashPassword = async (password) => {
    return await bcryptjs_1.default.hash(password, 12);
};
exports.correctPassword = async (candidatePassword, userPassword) => {
    return await bcryptjs_1.default.compare(candidatePassword, userPassword);
};
exports.protect = catchAsync_1.catchAsync(async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    else {
        return next(new appError_1.AppError('you are not logged in ! please log in first', 403));
    }
    const decoded = await util_1.promisify(jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    const currentUser = await typeorm_1.getRepository(User_1.User).findOne({ id: decoded.id });
    if (!currentUser) {
        return next(new appError_1.AppError('User No longer exists', 401));
    }
    req.user = currentUser;
    next();
});
exports.restrictToAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new appError_1.AppError("You don't have permission.", 401));
    }
    next();
};
const signToken = (id) => {
    return jsonwebtoken_1.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createToken = (req, res, userID) => {
    const token = signToken(userID);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });
    return token;
};
exports.signup = catchAsync_1.catchAsync(async (req, res, next) => {
    if (req.body.password !== req.body.passwordConfirm) {
        return next(new appError_1.AppError("Passwords doesn't match!", 400));
    }
    if (req.body.password.length < 8) {
        return next(new appError_1.AppError('Password must be at least 8 characters long.', 400));
    }
    if (!isEmail_1.isEmail(req.body.email)) {
        return next(new appError_1.AppError('Invalid email address.', 400));
    }
    const newUser = new User_1.User();
    newUser.name = req.body.name;
    newUser.email = req.body.email.toLowerCase();
    newUser.password = await exports.hashPassword(req.body.password);
    const user = await typeorm_1.getRepository(User_1.User).save(newUser);
    const token = createToken(req, res, user.id);
    const { password, ..._user } = user;
    res.status(201).json({
        status: 'success',
        token,
        data: _user,
    });
});
exports.login = catchAsync_1.catchAsync(async (req, res, next) => {
    if (!isEmail_1.isEmail(req.body.email) || req.body.password.length < 8) {
        return next(new appError_1.AppError('Incorrect email or password', 400));
    }
    const user = await typeorm_1.getRepository(User_1.User).findOne({ email: req.body.email }, { select: ['id', 'password', 'email', 'name'] });
    if (!user || !(await exports.correctPassword(req.body.password, user.password))) {
        return next(new appError_1.AppError('Incorrect email or password', 401));
    }
    const token = createToken(req, res, user.id);
    const { password, id, ..._user } = user;
    res.status(200).json({
        status: 'success',
        token,
        data: _user,
    });
});
