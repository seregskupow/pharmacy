import * as bcrypt from 'bcrypt';

import { UsersService } from '@modules/users/services/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { googlePayload } from './types';
import { Customer } from '@prisma/client';
import { CartService } from '@modules/cart/cart.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private cartService: CartService,
  ) {}
  public async validateUser(
    userEmail: string,
    pass: string,
  ): Promise<Customer> {
    const user = await this.userService.findOneByEmail(userEmail);
    if (!user || !user.password) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    return user;
  }

  public async createUser(user): Promise<Customer> {
    const pass = await this.hashPassword(user.password);

    const newUser = await this.userService.create({ ...user, password: pass });
    await this.cartService.create(newUser.id);
    return newUser;
  }

  public async validateUserGoogle(payload: googlePayload): Promise<Customer> {
    const { email, firstName: name, picture: avatar, googleId } = payload;

    const user = await this.userService.findOneByEmail(email);
    if (user)
      return await this.userService.update(user.id, {
        email,
        name,
        avatar,
      });

    const newUser = await this.userService.create({
      email,
      name,
      password: null,
      avatar,
      googleId,
    });
    await this.cartService.create(newUser.id);
    return newUser;
  }

  private async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.decode(token);
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
