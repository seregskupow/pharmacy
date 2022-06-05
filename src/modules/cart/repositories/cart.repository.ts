import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartRepository {
  constructor(private prisma: PrismaService) {}

  createCart(userId) {
    return this.prisma.cart.create({
      data: {
        customerId: userId,
      },
    });
  }

  async getItems(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        customerId: userId,
      },
    });
    if (cart) {
      return this.prisma.cartToProduct.findMany({
        where: {
          cartId: cart.id,
        },
        include: {
          Product: true,
        },
      });
    }
  }

  async deleteCartItems(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        customerId: userId,
      },
    });
    if (cart) {
      return this.prisma.cartToProduct.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
    }
  }

  async addItem(userId: number, productId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        customerId: userId,
      },
    });
    if (cart) {
      const product = await this.prisma.cartToProduct.findFirst({
        where: {
          productId: productId,
        },
      });
      if (product) {
        return this.prisma.cartToProduct.update({
          where: {
            productId: product.productId,
          },
          data: {
            quantity: product.quantity + 1,
          },
        });
      }
      return this.prisma.cartToProduct.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: 1,
        },
      });
    }
  }
  async removeItem(userId: number, productId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        customerId: userId,
      },
    });
    if (cart) {
      const product = await this.prisma.cartToProduct.findFirst({
        where: {
          productId: productId,
        },
      });
      if (product) {
        if (product.quantity === 1) {
          return this.prisma.cartToProduct.delete({
            where: {
              productId: product.productId,
            },
          });
        }
        return this.prisma.cartToProduct.update({
          where: {
            productId: product.productId,
          },
          data: {
            quantity: product.quantity - 1,
          },
        });
      }
    }
  }
}
