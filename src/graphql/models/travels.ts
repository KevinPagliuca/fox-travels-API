import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Location } from './location';

@ObjectType('Travel')
export class Travel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  minPrice: number;

  @Field()
  maxPrice?: number;

  @Field()
  pricePerMiles: number;

  @Field()
  discount?: number;

  @Field()
  locationId: string;

  @Field(() => Location)
  location: Location;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
