import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CreateOrderResponseDto } from './dtos/create-order-response.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrderById(id: string): Promise<Order | null> {
    return this.ordersRepository.getOrderById(id);
  }

  async addOrder(order: CreateOrderDto): Promise<CreateOrderResponseDto> {
    return this.ordersRepository.addOrder(order);
  }
}
