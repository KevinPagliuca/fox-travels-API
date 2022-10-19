import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Travel } from './travels';

@ObjectType('User')
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Travel])
  travels: Travel[];
  // purchases Purchases[]

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType('CreateUser')
export class UserWithToken {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
