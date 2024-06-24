import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthUser } from 'src/utils/decorators/user/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const booking = await this.bookingsService.create(
      createBookingDto,
      authUser,
    );
    return booking;
  }

  @Get()
  async findAll(@AuthUser() authUser: AuthUserType, @Query() query: any) {
    const bookings = await this.bookingsService.findAll(authUser, query);
    return bookings;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const booking = await this.bookingsService.findOne(+id, authUser);
    return booking;
  }

  @Patch(':id/reject-booking')
  async rejectBooking(
    @Param('id') id: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const booking = await this.bookingsService.rejectBooking(+id, authUser);
    return booking;
  }

  @Patch(':id/accept-booking')
  async acceptBooking(
    @Param('id') id: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const booking = await this.bookingsService.acceptBooking(+id, authUser);
    return booking;
  }

  @Patch(':id/cancle-booking')
  async cancleBooking(
    @Param('id') id: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const booking = await this.bookingsService.cancleBooking(+id, authUser);
    return booking;
  }

  @Patch(':id/start-trip')
  async startTrip(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const booking = await this.bookingsService.startTrip(+id, authUser);
    return booking;
  }

  @Patch(':id/complete-booking')
  async completeBooling(
    @Param('id') id: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const booking = await this.bookingsService.completeBooking(+id, authUser);
    return booking;
  }
}
