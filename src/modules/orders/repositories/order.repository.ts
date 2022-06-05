import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  createOrder(userId: number, total: number) {
    return this.prisma.order.create({
      data: {
        customerId: userId,
        total: total,
        adress: '',
      },
    });
  }

  async getOrders(userId: number) {
    return this.prisma.order.findMany({
      where: {
        customerId: userId,
      },
      include: {
        OrderToProduct: {
          include: {
            Product: true,
          },
        },
      },
    });
  }

  async getItems(orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });
    if (order) {
      return this.prisma.orderToProduct.findMany({
        where: {
          orderId: order.id,
        },
        include: {
          Product: true,
        },
      });
    }
  }

  async addItem(orderId: number, productId: number, quantity: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });
    if (order) {
      return this.prisma.orderToProduct.create({
        data: {
          orderId: order.id,
          productId: productId,
          quantity,
        },
      });
    }
  }
}
