import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
  imports: [ConfigModule.forRoot(), GraphQLModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
