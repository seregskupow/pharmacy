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
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(morgan('tiny'));
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidateInputPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
      transform: true,
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
      store: new SessionStore({
        tableName: 'user_sessions',
        pool,
        createTableIfMissing: true,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(1337);
}
bootstrap();
