import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getMe(@Req() req: SessionRequest) {
    console.log({ USER: req.user });
    return req.user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
