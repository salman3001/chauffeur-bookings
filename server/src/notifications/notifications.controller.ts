import { Controller, Get, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import CustomRes from 'src/utils/CustomRes';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async myNotifications(@AuthUser() user: AuthUserType, @Query() query: any) {
    const data = await this.notificationsService.myNotifications(user, query);
    return CustomRes({
      code: 200,
      success: true,
      data,
    });
  }

  @Get('menu')
  async menuNotifications(@AuthUser() user: AuthUserType) {
    const data = await this.notificationsService.getMenuNotifications(user);
    return CustomRes({
      code: 200,
      success: true,
      data,
    });
  }

  @Delete('remove-read')
  async removeRead(@AuthUser() user: AuthUserType) {
    await this.notificationsService.removeRead(user);
    return CustomRes({
      code: 200,
      success: true,
      message: 'Notifications removed',
    });
  }

  @Delete('remove-all')
  async removeAll(@AuthUser() user: AuthUserType) {
    await this.notificationsService.removeAll(user);
    return CustomRes({
      code: 200,
      success: true,
      message: 'Notifications removed',
    });
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string, @AuthUser() user: AuthUserType) {
    await this.notificationsService.removeOne(+id, user);
    return CustomRes({
      code: 200,
      success: true,
      message: 'Notification removed',
    });
  }

  @Patch(':id/mark-as-read')
  async markAsRead(@Param('id') id: string, @AuthUser() user: AuthUserType) {
    await this.notificationsService.markAsRead(+id, user);
    return CustomRes({
      code: 200,
      success: true,
      message: 'Notification marked as read',
    });
  }

  @Patch(':id/mark-as-unread')
  async markAsUnread(@Param('id') id: string, @AuthUser() user: AuthUserType) {
    await this.notificationsService.markAsUnread(+id, user);
    return CustomRes({
      code: 200,
      success: true,
      message: 'Notification marked as unread',
    });
  }
}
