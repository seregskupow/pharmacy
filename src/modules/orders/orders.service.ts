import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrdersService {
  constructor(private orderRepository: OrderRepository) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  createOrder(userId: number, total: number) {
    return this.orderRepository.createOrder(userId, total);
  }

  getItems(orderId: number) {
    return this.orderRepository.getItems(orderId);
  }

  addItem(userId: number, productId: number, quantity: number) {
    return this.orderRepository.addItem(userId, productId, quantity);
  }

  getOrders(userId: number) {
    return this.orderRepository.getOrders(userId);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
