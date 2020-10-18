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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const User_1 = require("./User");
let Cart = class Cart {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Cart.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_1.User, (user) => user.id),
    typeorm_1.Column({ nullable: false, name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Cart.prototype, "user_id", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => Product_1.Product, (product) => product.id),
    typeorm_1.Column({ name: 'product_id', nullable: false, type: 'uuid' }),
    __metadata("design:type", String)
], Cart.prototype, "product_id", void 0);
__decorate([
    typeorm_1.Column({ type: 'int2', name: 'quantity', nullable: false }),
    typeorm_1.Check(`"quantity" > 0`),
    __metadata("design:type", Number)
], Cart.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', name: 'size', nullable: false }),
    __metadata("design:type", String)
], Cart.prototype, "size", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', name: 'color', nullable: false }),
    __metadata("design:type", String)
], Cart.prototype, "color", void 0);
Cart = __decorate([
    typeorm_1.Entity({ name: 'cart' }),
    typeorm_1.Unique(['user_id', 'product_id', 'size', 'color'])
], Cart);
exports.Cart = Cart;
