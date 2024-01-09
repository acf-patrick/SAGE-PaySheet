import { Test, TestingModule } from '@nestjs/testing';
import { PaysheetService } from './paysheet.service';
import { PaysheetController } from './paysheet.controller';

describe('PaysheetController', () => {
  let controller: PaysheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaysheetController],
      providers: [PaysheetService],
    }).compile();

    controller = module.get<PaysheetController>(PaysheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
