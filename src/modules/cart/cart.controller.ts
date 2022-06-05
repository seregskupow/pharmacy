import { AuthenticatedGuard } from '@core/guards/authenticated.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll(@Req() req: SessionRequest) {
    console.log({ USER: req.user });
    return this.cartService.getCartItems(req.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('/add')
  addItem(@Body() body: { productId: number }, @Req() req: SessionRequest) {
    return this.cartService.addItem(req.user.id, body.productId);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('/remove')
  removeItem(@Body() body: { productId: number }, @Req() req: SessionRequest) {
    return this.cartService.removeItem(req.user.id, body.productId);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/formorder')
  cartToOrder(@Req() req: SessionRequest) {
    return this.cartService.cartToOrder(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
