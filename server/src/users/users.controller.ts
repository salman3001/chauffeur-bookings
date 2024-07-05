import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CustomRes from 'src/utils/CustomRes';
import { AuthUserType } from 'src/utils/types/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckAvailabiltyDto } from './dto/check-availabilty.dto';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { UserFilterQuery } from './user.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
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
  async findAll(
    @AuthUser() authUser: AuthUserType,
    @Query() query: UserFilterQuery,
  ) {
    const users = await this.usersService.findAll(authUser, query);
    return CustomRes({
      code: 200,
      data: users,
      success: true,
    });
  }

  @Get('chauffeurs')
  async getchauffeur(@AuthUser() authUser: AuthUserType, @Query() query: any) {
    const results = await this.usersService.getChauffeur(authUser, query);
    return CustomRes({
      code: 200,
      data: results,
      success: true,
    });
  }

  @Get('chauffeurs/active')
  async getActivechauffeur(
    @AuthUser() authUser: AuthUserType,
    @Query() query: any,
  ) {
    const results = await this.usersService.getActiveChauffeur(authUser, query);
    return CustomRes({
      code: 200,
      data: results,
      success: true,
    });
  }

  @Get('chauffeurs/availabilty')
  async getAvailableChauffeurs(
    @AuthUser() authUser: AuthUserType,
    @Query() query: CheckAvailabiltyDto,
  ) {
    const results = await this.usersService.getAvailableChauffeurs(
      query,
      authUser,
    );
    return CustomRes({
      code: 200,
      data: results,
      success: true,
    });
  }

  @Get('chauffeurs/:id/availabilty')
  async checkAvailabilty(
    @Param('id') chauffeurId: string,
    @AuthUser() authUser: AuthUserType,
    @Query() query: CheckAvailabiltyDto,
  ) {
    const results = await this.usersService.checkAvailabilty(
      +chauffeurId,
      query,
      authUser,
    );
    return CustomRes({
      code: 200,
      data: results,
      success: true,
      message: 'slot is available',
    });
  }

  @Get('customers')
  async getCustomers(@AuthUser() authUser: AuthUserType, @Query() query: any) {
    const results = await this.usersService.getCustomer(authUser, query);
    return CustomRes({
      code: 200,
      data: results,
      success: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const user = await this.usersService.findOne(+id, authUser);
    return CustomRes({
      code: 200,
      data: user,
      success: true,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
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
