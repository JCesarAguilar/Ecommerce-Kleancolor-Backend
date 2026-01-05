import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @HttpCode(200)
  async getOrderById(id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  @HttpCode(201)
  async addOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.addOrder(dto);
  }
}
