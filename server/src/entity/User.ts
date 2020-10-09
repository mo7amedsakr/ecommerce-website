import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 100, nullable: false, select: false })
  password!: string;

  @Column({
    type: 'varchar',
    length: 5,
    enum: ['user', 'admin'],
    default: 'user',
    nullable: false,
  })
  role!: 'user' | 'admin';

  @Column({ type: 'timestamp', default: () => 'NOW()', nullable: false })
  inserted_at!: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()', nullable: false })
  updated_at!: Date;
}
