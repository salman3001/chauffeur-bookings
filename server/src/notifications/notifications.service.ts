import { Injectable } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRepository } from './notification.repository';
import User from 'src/users/entities/user.entity';
import { NotificationsGateway } from './notifications-gateway/notifications.gateway';
import { NotificationType } from './enums/NotificationType';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private norificationRepo: NotificationRepository,
    private notificationGateWay: NotificationsGateway,
  ) {}

  async sendBookingCreated(user: User, bookingId: number) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Booking Created',
        subTitle:
          'Your Booking has been created. Our cuaffeur will confirm soon',
        type: NotificationType.BOOKING_CREATED,
        meta: {
          bookingId: bookingId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  async sendBookingRecieved(user: User, bookingId: number) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Booking Recieved',
        subTitle: 'New Booking has recieved, click to check',
        type: NotificationType.BOOKING_RECIEVED,
        meta: {
          bookingId: bookingId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  async sendBookingRejected(user: User, bookingId: number, reason: string) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Booking Rejected',
        subTitle: `Your Booking has Rejected, Reason ${reason}`,
        type: NotificationType.BOOKING_REJECTED,
        meta: {
          bookingId: bookingId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  async sendBookingCancled(user: User, bookingId: number) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Booking Cancled',
        subTitle: 'A Booking has been cancled, Click to review',
        type: NotificationType.BOOKING_CANCLED,
        meta: {
          bookingId: bookingId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  async sendBookingConfimed(user: User, bookingId: number) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Booking Confirmed',
        subTitle: 'Your booking has been confirmed, Click to review',
        type: NotificationType.BOOKING_COMFIRMED,
        meta: {
          bookingId: bookingId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  async sendTripStarted(user: User, bookingId: number) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Chauffeur departed',
        subTitle: 'Your Chauffeur is on the way. Click to live track',
        type: NotificationType.BOOKING_TRIP_STARTED,
        meta: {
          bookingId: bookingId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  async sendBookingComplete(user: User, bookingId: number) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Your trip has completed',
        subTitle: 'Thank you for choosing us!',
        type: NotificationType.BOOKING_COMPLETE,
        meta: {
          bookingId: bookingId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  async sendPaymentRecieved(
    user: User,
    paymentId: number,
    paymentAmount: number | string,
  ) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Payment Recived',
        subTitle: `Payment of ${paymentAmount} has been recied`,
        type: NotificationType.PAYMENT_RECIEVED,
        meta: {
          paymentId: paymentId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  async sendRefundInitiated(user: User, refundId: number) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Refund Initiated',
        subTitle: 'Your refund has inititaed. Click to review',
        type: NotificationType.REFUND_INITIATED,
        meta: {
          refundId: refundId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  async sendRefundIssues(user: User, refundId: number) {
    const notification = this.norificationRepo.create({
      data: {
        title: 'Refund Issued',
        subTitle: 'Your refund has processed. Thank you for choosing us.',
        type: NotificationType.REFUND_ISSUED,
        meta: {
          refundId: refundId,
        },
      },
      readAt: null,
    });
    await this.saveAndSend(notification, user);
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  private async saveAndSend(notification: Notification, user: User) {
    notification.user = user;
    const savedNotification = await this.norificationRepo.save(notification);
    this.notificationGateWay.notify(user, savedNotification);
  }
}
