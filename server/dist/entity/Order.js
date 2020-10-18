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
exports.OrderItem = exports.Order = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const User_1 = require("./User");
let Order = class Order {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToMany(() => User_1.User, (user) => user.id),
    typeorm_1.Column({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({ type: 'numeric', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "total", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => 'NOW()', nullable: false }),
    __metadata("design:type", Date)
], Order.prototype, "inserted_at", void 0);
Order = __decorate([
    typeorm_1.Entity({ name: 'order' })
], Order);
exports.Order = Order;
let OrderItem = class OrderItem {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Order, (order) => order.id),
    typeorm_1.Column({ type: 'uuid', nullable: false, name: 'order_id' }),
    typeorm_1.JoinColumn({ name: 'order_id' }),
    __metadata("design:type", String)
], OrderItem.prototype, "order_id", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => Product_1.Product, (product) => product.id),
    typeorm_1.Column({ type: 'uuid', nullable: false, name: 'product_id' }),
    __metadata("design:type", String)
], OrderItem.prototype, "product_id", void 0);
__decorate([
    typeorm_1.Column({ type: 'int2', nullable: false, name: 'quantity' }),
    typeorm_1.Check(`"quantity" > 0`),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', name: 'size', nullable: false }),
    __metadata("design:type", String)
], OrderItem.prototype, "size", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', name: 'color', nullable: false }),
    __metadata("design:type", String)
], OrderItem.prototype, "color", void 0);
OrderItem = __decorate([
    typeorm_1.Entity({ name: 'order_item' }),
    typeorm_1.Unique(['order_id', 'product_id', 'quantity', 'size', 'color'])
], OrderItem);
exports.OrderItem = OrderItem;
