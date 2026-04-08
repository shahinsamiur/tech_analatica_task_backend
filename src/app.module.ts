import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler'; // Removed ThrottlerModuleOptions type here

import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';

import { GlobalExceptionFilter } from './common/filters/http-exception';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { CustomThrottlerGuard } from './common/guards/throttler.guard';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    AuthModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
