import {
  Check,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User, (user) => user.id)
  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  total: string;

  @Column({ type: 'timestamp', default: () => 'NOW()', nullable: false })
  inserted_at: Date;
}

@Entity({ name: 'order_item' })
@Unique(['order_id', 'product_id', 'quantity', 'size', 'color'])
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Order, (order) => order.id)
  @Column({ type: 'uuid', nullable: false, name: 'order_id' })
  @JoinColumn({ name: 'order_id' })
  order_id: string;

  @ManyToMany((type) => Product, (product) => product.id)
  @Column({ type: 'uuid', nullable: false, name: 'product_id' })
  product_id: string;

  @Column({ type: 'int2', nullable: false, name: 'quantity' })
  @Check(`"quantity" > 0`)
  quantity: number;

  @Column({ type: 'text', name: 'size', nullable: false })
  size: string;

  @Column({ type: 'text', name: 'color', nullable: false })
  color: string;
}
