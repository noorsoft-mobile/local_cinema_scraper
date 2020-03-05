import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrabberModule } from './grabber/grabber.module';

@Module({
  imports: [GrabberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
