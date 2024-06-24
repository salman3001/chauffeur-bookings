import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthUser } from 'src/utils/decorators/user/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import ValidatorPipe from 'src/utils/pipes/ValidatorPipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, IntersectionType } from '@nestjs/swagger';
import { UploadImageDto } from './dto/upload-image.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: IntersectionType(CreateCarDto, UploadImageDto),
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body(new ValidatorPipe()) createCarDto: CreateCarDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const car = await this.carsService.create(createCarDto, authUser, image);
    return car;
  }

  @Get()
  async findAll(@AuthUser() authUser: AuthUserType, @Query() query: any) {
    const cars = await this.carsService.findAll(authUser, query);
    return cars;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const car = await this.carsService.findOne(+id, authUser);
    return car;
  }

  @Patch(':id')
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: IntersectionType(UpdateCarDto, UploadImageDto),
  })
  @UseInterceptors(FileInterceptor('image'))
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
