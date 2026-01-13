import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.ordersService.getOrderById(id);
  }

  @ApiBearerAuth()
  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async addOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.addOrder(dto);
  }
}
