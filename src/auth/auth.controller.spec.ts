import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { UserService } from '../user/user.service';
import config from '../config';
import { PrismaService } from '../common/services/prisma.service';
import { LoggerModule } from 'nestjs-pino';
// import { getRedisToken } from '@liaoliaots/nestjs-redis';

describe('Auth Controller', () => {
  let controller: AuthController;
  let spyService: AuthService;
  // let get: jest.Mock;
  // let set: jest.Mock;
  // let del: jest.Mock;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        LoggerModule.forRoot({
          ...config.pino,
        }),
        JwtModule.register({
          secret: config.jwt.secretOrKey,
          signOptions: {
            expiresIn: config.jwt.expiresIn,
          },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
      providers: [
        AuthService,
        MailSenderService,
        UserService,
        PrismaService,
        // {
        //   provide: getRedisToken('default'),
        //   useValue: {
        //     get,
        //     set,
        //     del,
        //   },
        // },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
  });
});
