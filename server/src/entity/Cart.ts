import {
  Check,
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity({ name: 'cart' })
@Unique(['user_id', 'product_id', 'size', 'color'])
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.id)
  @Column({ nullable: false, name: 'user_id', type: 'uuid' })
  user_id: string;

  @ManyToMany((type) => Product, (product) => product.id)
  @Column({ name: 'product_id', nullable: false, type: 'uuid' })
  product_id: string;

  @Column({ type: 'int2', name: 'quantity', nullable: false })
  @Check(`"quantity" > 0`)
  quantity: number;

  @Column({ type: 'text', name: 'size', nullable: false })
  size: string;

  @Column({ type: 'text', name: 'color', nullable: false })
  color: string;
}
