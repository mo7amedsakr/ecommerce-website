"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Product_1 = require("./entity/Product");
const filesName = [
    'accessories1.json',
    'accessories2.json',
    'accessories3.json',
    'footwear1.json',
    'footwear2.json',
    'footwear3.json',
    'pants1.json',
    'pants2.json',
    'pants3.json',
    'tshirts1.json',
    'tshirts2.json',
    'tshirts3.json',
];
const files = filesName.map((n) => {
    return JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../dev-data/', n), 'utf-8'));
});
const main = async () => {
    const connection = await typeorm_1.createConnection({
        type: 'postgres',
        url: 'postgres://rdknbtuadgpyzt:ae2db8fc898835c94388619be28459887399de7db906a0f2c0a948f2e76c0b3e@ec2-54-147-209-121.compute-1.amazonaws.com:5432/d5ifq253duvsmr',
        logging: false,
        entities: ['./dist/entity/*.js'],
        migrations: ['./dist/migration/*.js'],
        ssl: {
            rejectUnauthorized: false,
        },
    });
    for (let i = 0; i < files.length; i++) {
        const keys = Object.keys(files[i]);
        const values = Object.values(files[i]);
        for (let j = 0; j < keys.length; j++) {
            const { price, name, sizes, colors, images, quantity, description, collection, } = values[j];
            const product = new Product_1.Product();
            product.slug = keys[j];
            product.price = price.split(',').join('');
            product.name = name;
            product.sizes = sizes;
            product.colors = colors;
            product.collection = collection;
            product.images = images;
            product.quantity = quantity;
            product.description = description;
            await typeorm_1.getRepository(Product_1.Product)
                .createQueryBuilder('product')
                .insert()
                .values(product)
                .onConflict('DO NOTHING')
                .execute();
        }
    }
};
main().catch(console.error);
