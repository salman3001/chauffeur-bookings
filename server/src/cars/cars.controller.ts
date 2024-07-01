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
import { AuthUserType } from 'src/utils/types/common';
import ValidatorPipe from 'src/utils/pipes/ValidatorPipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, IntersectionType } from '@nestjs/swagger';
import { UploadImageDto } from './dto/upload-image.dto';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { fileFilter } from 'src/files/helpers/fileFIlter';
import CustomRes from 'src/utils/CustomRes';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: IntersectionType(CreateCarDto, UploadImageDto),
  })
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileFilter({
        maxSizeInMb: 5,
        mimeType: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      }),
    ),
  )
  async create(
    @Body(new ValidatorPipe()) createCarDto: CreateCarDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const car = await this.carsService.create(createCarDto, authUser, image);
    return CustomRes({
      code: 201,
      success: true,
      data: car,
      message: 'Car created',
    });
  }

  @Get()
  async findAll(@AuthUser() authUser: AuthUserType, @Query() query: any) {
    const cars = await this.carsService.findAll(authUser, query);
    return CustomRes({
      code: 200,
      success: true,
      data: cars,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const car = await this.carsService.findOne(+id, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: car,
    });
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: IntersectionType(UpdateCarDto, UploadImageDto),
  })
  @UseInterceptors(
    FileInterceptor(
      'image',
      fileFilter({
        maxSizeInMb: 5,
        mimeType: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      }),
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const car = await this.carsService.update(
      +id,
      updateCarDto,
      authUser,
      image,
    );

    return CustomRes({
      code: 200,
      success: true,
      data: car,
      message: 'Car updated',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const car = await this.carsService.remove(+id, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: car,
      message: 'Car deleted',
    });
  }
}
