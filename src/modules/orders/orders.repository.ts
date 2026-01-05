import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Product } from '../products/entities/product.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderResponseDto } from './dtos/create-order-response.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id });
  }

  async addOrder(order: CreateOrderDto): Promise<CreateOrderResponseDto> {
    //Buscar a un usario por id
    const user = await this.userRepository.findOneBy({ id: order.userId });
    if (!user) throw new NotFoundException('Usuario no existe');

    //Crear un registro en la tabla orders con el usuario encontrado
    const newOrder = this.orderRepository.create({
      user: user,
      date: new Date(),
    });
    const savedOrder = await this.orderRepository.save(newOrder);

    //Busca los productos por id recibidos en la request actualizando el total de la compra y reduciendo el stock del producto. correspondiente. (al realizar la búsqueda de todos los productos aquellos con stock igual a 0 no deben ser mostrados).
    const idsProducts = order.products.map((product) => product.id);

    const productsBuyed = await this.productRepository.findBy({
      id: In(idsProducts),
      stock: MoreThan(0),
    });

    if (productsBuyed.length !== idsProducts.length) {
      throw new NotFoundException(
        'Algunos productos no existen o están agotados',
      );
    }

    //Total de la compra
    const totalPrice = productsBuyed.reduce(
      (acc, product) => acc + product.price,
      0,
    );
    //Reducir el stock de los productos
    productsBuyed.forEach((product) => {
      product.stock -= 1;
    });
    //Guardar stock actualizado
    await this.productRepository.save(productsBuyed);

    //Crear orden detail (price + products + order)
    const detail = this.orderDetailRepository.create({
      order: savedOrder,
      products: productsBuyed,
      price: totalPrice,
    });
    const saveDetail = await this.orderDetailRepository.save(detail);

    return {
      orderId: savedOrder.id,
      totalPrice: totalPrice,
      orderDetailId: saveDetail.id,
    };
  }
}
