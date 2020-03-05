import { Test, TestingModule } from '@nestjs/testing';
import { GrabberService } from './grabber.service';

describe('GrabberService', () => {
  let service: GrabberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrabberService],
    }).compile();

    service = module.get<GrabberService>(GrabberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
