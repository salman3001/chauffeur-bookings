import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('email-queue', {})
export class EmailQueueProcessor extends WorkerHost {
  constructor() {
    console.log('ran');

    super();
  }

  async process(job: Job) {
    console.log('ran2');
    // await this.mailService.send(job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    console.log('Email sent');
  }

  @OnWorkerEvent('stalled')
  other() {
    console.log('errorr');
  }
}
