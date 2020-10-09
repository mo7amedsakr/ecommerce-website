import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', array: true, nullable: false })
  sizes: string[];

  @Column({ type: 'text', array: true, nullable: false })
  colors: string[];

  @Column({ type: 'text', array: true, nullable: false })
  images: string[];

  @Column({ type: 'numeric', precision: 6, scale: 2, nullable: false })
  price: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  slug: string;

  @Column({ type: 'numeric', precision: 6, scale: 2, default: null })
  discount_price: number;

  @Column({
    type: 'varchar',
    length: 20,
    enum: ['accessories', 'footwear', 'tshirts', 'pants'],
  })
  collection: 'accessories' | 'footwear' | 'tshirts' | 'pants';
}
