import { Category } from 'src/modules/categories/entities/category.entity';
import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'https://example.com/default-product.png',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.name)
  category: Category;

  @ManyToMany(() => OrderDetail, (order) => order.id)
  order: OrderDetail;
}
