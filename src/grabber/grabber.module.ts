import { Module } from '@nestjs/common';
import { GrabberService } from './grabber.service';
import { GrabberController } from './grabber.controller';

@Module({
  providers: [GrabberService],
  controllers: [GrabberController]
})
export class GrabberModule {}
