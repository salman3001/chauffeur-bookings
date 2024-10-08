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
import { AuthUserType } from 'src/utils/types/common';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import CustomRes from 'src/utils/CustomRes';

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
    return CustomRes({
      code: 201,
      success: true,
      message: 'Booking Created',
      data: booking,
    });
  }

  @Get()
  async findAll(@AuthUser() authUser: AuthUserType, @Query() query: any) {
    const bookings = await this.bookingsService.findAll(authUser, query);
    return CustomRes({
      code: 200,
      success: true,
      data: bookings,
    });
  }

  @Get('/customer')
  async findCustomerBookings(
    @AuthUser() authUser: AuthUserType,
    @Query() query: any,
  ) {
    const bookings = await this.bookingsService.findCusomerBookings(
      authUser,
      query,
    );
    return CustomRes({
      code: 200,
      success: true,
      data: bookings,
    });
  }

  @Get('/chauffeur')
  async findChauffeurBookings(
    @AuthUser() authUser: AuthUserType,
    @Query() query: any,
  ) {
    const bookings = await this.bookingsService.findChauffeurBookings(
      authUser,
      query,
    );
    return CustomRes({
      code: 200,
      success: true,
      data: bookings,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const booking = await this.bookingsService.findOne(+id, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: booking,
    });
  }

  @Patch(':id/reject-booking')
  async rejectBooking(
    @Param('id') id: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const booking = await this.bookingsService.rejectBooking(+id, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: booking,
      message: 'Booking Rejected',
    });
  }

  @Patch(':id/accept-booking')
  async acceptBooking(
    @Param('id') id: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const booking = await this.bookingsService.acceptBooking(+id, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: booking,
      message: 'Booking Accepted',
    });
  }

  @Patch(':id/cancle-booking')
  async cancleBooking(
    @Param('id') id: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const booking = await this.bookingsService.cancleBooking(+id, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: booking,
      message: 'Booking Cancled',
    });
  }

  @Patch(':id/start-trip')
  async startTrip(@Param('id') id: string, @AuthUser() authUser: AuthUserType) {
    const booking = await this.bookingsService.startTrip(+id, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: booking,
      message: 'Booking Status updated',
    });
  }

  @Patch(':id/complete-booking')
  async completeBooling(
    @Param('id') id: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const booking = await this.bookingsService.completeBooking(+id, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: booking,
      message: 'Booking Completed',
    });
  }
}
