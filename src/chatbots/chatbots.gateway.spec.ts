import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotsGateway } from './chatbots.gateway';
import { ChatbotsService } from './chatbots.service';

describe('ChatbotsGateway', () => {
  let gateway: ChatbotsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatbotsGateway, ChatbotsService],
    }).compile();

    gateway = module.get<ChatbotsGateway>(ChatbotsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
