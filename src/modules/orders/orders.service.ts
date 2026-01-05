import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CreateOrderResponseDto } from './dtos/create-order-response.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }
  async addOrder(order: CreateOrderDto): Promise<CreateOrderResponseDto> {
    return this.ordersRepository.addOrder(order);
  }
}
