import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookedSlotsService } from './booked-slots.service';
import { findAllByMonthDto } from './dto/findAllByMonth.dto';
import ValidatorPipe from 'src/core/utils/pipes/ValidatorPipe';
import { AuthUser } from 'src/core/utils/decorators/user/authUser.decorator';
import { AuthUserType } from 'src/core/utils/types/common';
import CustomRes from 'src/core/utils/CustomRes';

@Controller('booked-slots')
export class BookedSlotsController {
  constructor(private readonly bookedSlotsService: BookedSlotsService) {}

  @Get('by-month')
  async findAllByMonth(
    @Query(new ValidatorPipe()) query: findAllByMonthDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const slots = await this.bookedSlotsService.findAllByMonth(query, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: slots,
    });
  }

  @Get('chauffeur/:id/by-month')
  async findAllForChauffeurByMonth(
    @Param('id') id: string,
    @Query(new ValidatorPipe()) query: findAllByMonthDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const slots = await this.bookedSlotsService.findAllForChauffeurByMonth(
      +id,
      query,
      authUser,
    );

    return slots;
  }

  @Get('chauffeur/:id')
  async findChauffeurBookedSlotsByDate(
    @Param('id') id: string,
    @Query(new ValidatorPipe()) query: findAllByMonthDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const slots = await this.bookedSlotsService.findAllForChauffeurByMonth(
      +id,
      query,
      authUser,
    );

    return slots;
  }
}
