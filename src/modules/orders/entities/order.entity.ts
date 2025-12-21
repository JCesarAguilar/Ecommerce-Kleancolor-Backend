import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => OrderDetail, (order) => order.id)
  orderDetail: OrderDetail;
}
