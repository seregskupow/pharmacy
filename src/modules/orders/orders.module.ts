import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './repositories/order.repository';
import { PrismaService } from '@core/prisma/prisma.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, PrismaService],
  imports: [PrismaService],
  exports: [OrderRepository, OrdersService],
})
export class OrdersModule {}
