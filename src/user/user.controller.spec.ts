import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../common/services/prisma.service';
import { LoggerModule } from 'nestjs-pino';
import config from '@/config';

describe('User Controller', () => {
  let controller: UserController;
  let spyService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        LoggerModule.forRoot({
          ...config.pino,
        }),
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    spyService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
  });
});
