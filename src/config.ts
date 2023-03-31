import R from 'ramda';

export default {
  swagger: {
    info: {
      title: `${process.env.APP_NAME} Service API`,
      description: `Other documentations  about ${process.env.APP_NAME} : 
          \n <a href='https://github.com/Leizhenpeng/zuelBookHelperService/tree/main/docs/exceptions.md'>Exception Documents</a>`,
      version: '0.1.0',
    },
  },

  jwt: {
    // https://randomkeygen.com/
    secretOrKey: '__SENDGRID_API_KEY__',
    expiresIn: 86400,
  },

  // You can also use any other email sending services
  mail: {
    service: {
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      user: 'apikey',
      pass: '__SENDGRID_API_KEY__',
    },
    senderCredentials: {
      name: '__SENDER_NAME__',
      email: '__SENDER_EMAIL__',
    },
  },

  // these are used in the mail templates
  project: {
    name: '__YOUR_PROJECT_NAME__',
    address: '__YOUR_PROJECT_ADDRESS__',
    logoUrl: 'https://__YOUR_PROJECT_LOGO_URL__',
    slogan: 'Made with ❤️ in Istanbul',
    color: '#123456',
    socials: [
      ['GitHub', '__Project_GitHub_URL__'],
      ['__Social_Media_1__', '__Social_Media_1_URL__'],
      ['__Social_Media_2__', '__Social_Media_2_URL__'],
    ],
    url: 'http://localhost:4200',
    mailVerificationUrl: 'http://localhost:3000/auth/verify',
    mailChangeUrl: 'http://localhost:3000/auth/change-email',
    resetPasswordUrl: 'http://localhost:4200/reset-password',
    termsOfServiceUrl: 'http://localhost:4200/legal/terms',
  },

  pino: {
    // refer https://github.com/pinojs/pino-http#logger-options
    pinoHttp: {
      // refer https://github.com/pinojs/pino-pretty#cliargs
      // https://github.com/pinojs/pino-pretty/blob/429d5f187e2081138b89583ff954a910085ea0f3/test/lib/utils.public.test.js
      level: 'info',
      autoLogging: true,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          levelFirst: false,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname,req.headers,req,context',
          singleLine: true,
          messageFormat: '🚀{context}🚀{msg}',
        },
      },

      useLevelLabels: true,
      serializers: {
        req: (req) =>
          R.evolve(
            {
              headers: R.omit(['authorization', 'cookie']),
            },
            req,
          ),
      },
    },
  },

  //spider
  axios: {
    zuel: {
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'http://202.114.238.250',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    },
  },

  //evnet-emitter
  eventEmitter: {
    wildcard: false,
    // the delimiter used to segment namespaces
    delimiter: '.',
    // set this to `true` if you want to emit the newListener event
    newListener: false,
    // set this to `true` if you want to emit the removeListener event
    removeListener: false,
    // the maximum amount of listeners that can be assigned to an event
    maxListeners: 10,
    // show event name in memory leak message when more than maximum amount of listeners is assigned
    verboseMemoryLeak: false,
    // disable throwing uncaughtException if an error event is emitted and it has no listeners
    ignoreErrors: false,
  },
};
