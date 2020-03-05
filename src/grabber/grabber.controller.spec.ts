import { Test, TestingModule } from '@nestjs/testing';
import { GrabberController } from './grabber.controller';

describe('Grabber Controller', () => {
  let controller: GrabberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrabberController],
    }).compile();

    controller = module.get<GrabberController>(GrabberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
