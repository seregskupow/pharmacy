import { UserDto } from '@modules/users/dto/user.dto';
import { Customer } from '@prisma/client';

export type googlePayload = {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  googleId: string;
};

export type Done = (err: Error, user: Customer) => void;
