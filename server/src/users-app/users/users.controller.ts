import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import ValidatorPipe from 'src/core/utils/pipes/ValidatorPipe';
import CustomRes from 'src/core/utils/CustomRes';
import { AuthUser } from 'src/core/utils/decorators/user/authUser.decorator';
import { AuthUserType } from 'src/core/utils/types/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body(new ValidatorPipe()) createUserDto: CreateUserDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const user = await this.usersService.create(createUserDto, authUser);
    return CustomRes({
      code: 201,
      data: user,
      success: true,
      message: 'User created',
    });
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return CustomRes({
      code: 200,
      data: users,
      success: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return CustomRes({
      code: 200,
      data: user,
      success: true,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidatorPipe()) updateUserDto: UpdateUserDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const user = await this.usersService.update(+id, updateUserDto, authUser);
    return CustomRes({
      code: 200,
      data: user,
      success: true,
      message: 'User Updated',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const user = await this.usersService.remove(+id, authUser);
    return CustomRes({
      code: 200,
      data: user,
      success: true,
      message: 'User removed',
    });
  }
}
