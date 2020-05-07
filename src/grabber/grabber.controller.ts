import { Controller, Get, Param } from '@nestjs/common';
import { GrabberService } from './grabber.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('grabber')
@Controller('grabber')
export class GrabberController {
  constructor(private readonly grabberService: GrabberService) {}

  @Get('/schedule')
  getData() {
    return this.grabberService.getSchedule();
  }
}
