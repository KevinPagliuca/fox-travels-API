import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as GQLModule } from '@nestjs/graphql';

import { PrismaService } from '../database/prisma/prisma.service';
import { IGQLError } from './interfaces/GQLError.interface';
import { LocationsResolver } from './modules/locations/locations.resolver';
import { LocationsService } from './modules/locations/locations.service';
import { TravelsResolver } from './modules/travels/travels.resolver';
import { TravelsService } from './modules/travels/travels.service';
import { UserResolver } from './modules/user/user.resolver';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    GQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: true,
      formatError: (error: IGQLError) => {
        return {
          message: error.message || error.extensions?.response?.message,
          statusCode: error.extensions?.response?.statusCode,
          error: error.extensions?.response?.error,
        };
      },
    }),
  ],
  providers: [
    // Resolvers
    UserResolver,
    TravelsResolver,
    LocationsResolver,

    // Services
    PrismaService,
    LocationsService,
    TravelsService,
    UserService,
  ],
})
export class GraphQLModule {}
