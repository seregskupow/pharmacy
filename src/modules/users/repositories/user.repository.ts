import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateUserDto): Promise<Customer> {
    return this.prisma.customer.create({
      data: dto,
    });
  }

  delete(id: number): Promise<Customer> {
    return this.prisma.customer.delete({
      where: { id },
    });
  }

  update(id: number, dto: UpdateUserDto): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  findOneById(id: number): Promise<Customer> {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  findOneByEmail(email: string): Promise<Customer> {
    return this.prisma.customer.findUnique({
      where: { email },
    });
  }

  async allUsers(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }
}
