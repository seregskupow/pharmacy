import * as dotenv from 'dotenv';
dotenv.config();
import * as morgan from 'morgan';
import * as session from 'express-session';
import * as passport from 'passport';
import * as ConnectPG from 'connect-pg-simple';
import * as pg from 'pg';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/prisma/pipes/validate.pipe';
import { BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(morgan('tiny'));

  app.useGlobalPipes(
    new ValidateInputPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  const SessionStore = ConnectPG(session);
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
      },
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      //store: MongoStore.create({ mongoUrl: process.env.MONGO_URL_DEV }),
      store: new SessionStore({
        tableName: 'user_sessions',
        pool,
        createTableIfMissing: true,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(1337);
}
bootstrap();
