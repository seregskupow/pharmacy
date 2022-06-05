import { OrdersService } from '@modules/orders/orders.service';
import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private orderService: OrdersService,
  ) {}

  create(userId: number) {
    return this.cartRepository.createCart(userId);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }

  getCartItems(userId: number) {
    return this.cartRepository.getItems(userId);
  }

  addItem(userId, productId) {
    return this.cartRepository.addItem(userId, productId);
  }

  removeItem(userId, productId) {
    return this.cartRepository.removeItem(userId, productId);
  }

  async cartToOrder(userId: number) {
    const cartItems = await this.getCartItems(userId);
    const cartTotal = cartItems.reduce(
      (total: number, item: any) =>
        (total += item.quantity * item.Product.price),
      0,
    );
    const order = await this.orderService.createOrder(userId, cartTotal);
    for (let i = 0; i < cartItems.length; i++) {
      await this.orderService.addItem(
        order.id,
        cartItems[i].productId,
        cartItems[i].quantity,
      );
    }
    await this.cartRepository.deleteCartItems(userId);
  }
}
