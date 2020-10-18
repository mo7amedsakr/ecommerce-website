"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const xss = require('xss-clean');
const errorController_1 = require("./controllers/errorController");
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const productsRouter_1 = __importDefault(require("./routes/productsRouter"));
const app = express_1.default();
app.enable('trust proxy');
// 1) Global Middlewares
// Implement CORS
app.use(cors_1.default());
app.options('*', cors_1.default());
// Serving static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'build')));
console.log(path_1.default.join(__dirname, '..', 'build'));
// Set security HTTP headers
app.use(helmet_1.default());
// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
// Limit requests from same API
if (process.env.NODE_ENV === 'production') {
    const limiter = express_rate_limit_1.default({
        max: 100,
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from this IP, please try again in an hour!',
    });
    app.use('/api', limiter);
}
// Body parser, [req.body]
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
// Data sanitization against noSQL query injection
// Data sanitization against XSS
app.use(xss());
// Prevent paramter pollution
app.use(compression_1.default());
// Test middleware
// app.use((req, res, next) => {
//   next();
// });
// Routes
app.use('/api/v1/users/', usersRouter_1.default);
app.use('/api/v1/products/', productsRouter_1.default);
app.all('*', (req, res, next) => {
    res.sendFile(`${__dirname}/build/index.html`);
});
app.use(errorController_1.globalErrorHandler);
exports.default = app;
