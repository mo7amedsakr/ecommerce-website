"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
process.on('uncaughtException', (err) => {
    console.log('UNCAUGH EXCEPTION! SHUTTING DOWN......');
    console.log(err.name, err.message);
    process.exit(1);
});
dotenv_1.default.config({ path: './config.env' });
const app_1 = __importDefault(require("./app"));
const main = async () => {
    const connection = await typeorm_1.createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: process.env.NODE_ENV === 'development',
        entities: ['./dist/entity/*.js'],
        migrations: ['./dist/migration/*.js'],
        ssl: {
            rejectUnauthorized: false,
        },
    });
    console.log('DATABASE CONNECTED!!');
    if (process.env.NODE_ENV === 'development') {
        await connection.runMigrations();
        console.log('MIGRATIONS DONE!!');
    }
    const port = process.env.PORT || 3000;
    const server = app_1.default.listen(port, () => {
        console.log(`App running on http://127.0.0.1:${port}`);
    });
    process.on('unhandledRejection', (err) => {
        console.log('UNHANDLER REJECTION! SHUTTING DOWN......');
        console.log(err.name, err.message);
        server.close(() => {
            process.exit(1);
        });
    });
    process.on('SIGTERM', () => {
        console.log('SIGTERM RECEIVED. Shutting down gracefully');
        server.close(() => {
            console.log('Process terminated!');
        });
    });
};
main().catch(console.error);
