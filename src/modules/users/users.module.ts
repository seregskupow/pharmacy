import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PrismaService],
  imports: [PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
