import { Customer } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto implements Partial<Customer> {
  @Exclude()
  password: string;
}
