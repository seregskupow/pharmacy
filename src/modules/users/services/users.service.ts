import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto): Promise<Customer> {
    return this.userRepository.create(createUserDto);
  }

  delete(id: number) {
    this.userRepository.delete(id);
  }

  update(id: number, oldUser: UpdateUserDto): Promise<Customer> {
    return this.userRepository.update(id, oldUser);
  }

  findOneById(id: number): Promise<Customer> {
    return this.userRepository.findOneById(id);
  }

  findOneByEmail(email: string): Promise<Customer> {
    return this.userRepository.findOneByEmail(email);
  }

  getAll() {
    return this.userRepository.allUsers();
  }
}
