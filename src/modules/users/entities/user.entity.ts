import { Order } from 'src/modules/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @Column({ length: 20, nullable: false })
  password: string;

  @Column({ type: 'int', nullable: true })
  phone?: number;

  @Column({ length: 50, nullable: true })
  country?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ length: 50, nullable: true })
  city?: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
