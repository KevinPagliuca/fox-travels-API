import { GraphQLError, GraphQLErrorExtensions } from 'graphql';

export interface IGQLError extends GraphQLError {
  extensions: GraphQLErrorExtensions & {
    response?: {
      message?: string;
      statusCode?: number;
      error?: string;
    };
  };
}
