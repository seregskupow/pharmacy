import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '@core/prisma/prisma.service';
import { CartRepository } from './repositories/cart.repository';
import { OrdersModule } from '@modules/orders/orders.module';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService, CartRepository],
  exports: [CartService],
  imports: [PrismaService, OrdersModule],
})
export class CartModule {}
