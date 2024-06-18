import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthUser } from 'src/core/utils/decorators/user/authUser.decorator';
import { AuthUserType } from 'src/core/utils/types/common';
import ValidatorPipe from 'src/core/utils/pipes/ValidatorPipe';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(
    @Body(new ValidatorPipe()) createCarDto: CreateCarDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const car = await this.carsService.create(createCarDto, authUser);
    return car;
  }

  @Get()
  async findAll(@AuthUser() authUser: AuthUserType) {
    const cars = await this.carsService.findAll(authUser);
    return cars;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const car = await this.carsService.findOne(+id, authUser);
    return car;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const car = await this.carsService.update(+id, updateCarDto, authUser);
    return car;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const car = await this.carsService.remove(+id, authUser);
    return car;
  }
}
