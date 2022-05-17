import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@modules/users/services/users.service';
import { Customer } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(user: Customer, done) {
    done(null, user.id);
  }

  async deserializeUser(userId: number, done) {
    const user = await this.userService.findOneById(userId);
    if (user) return done(null, user);
    return done(null, null);
  }
}
