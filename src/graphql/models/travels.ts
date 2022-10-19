import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from './user';

@ObjectType('Travel')
export class Travel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  price: number;

  @Field()
  discount?: number;

  @Field(() => User)
  user: User;

  // @Field()
  // purchases: Purchases[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
