import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from './graphql/graphql.module';
import { ApiModule } from './http/api/api.module';

@Module({
  imports: [ConfigModule.forRoot(), GraphQLModule, DatabaseModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
