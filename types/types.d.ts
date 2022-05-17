import { SessionUser } from '@modules/user/dto/sessionUser.dto';
import { Customer } from '@prisma/client';

declare global {
  type SessionRequest = Request & { user: Customer };
}

export {};
