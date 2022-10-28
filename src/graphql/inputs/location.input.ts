import { Field, InputType } from '@nestjs/graphql';

import { LocationTypeEnum } from '../models/location';

@InputType()
export class CreateLocationInput {
  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  placeName: string;

  @Field(() => LocationTypeEnum)
  type: LocationTypeEnum;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

@InputType()
export class UpdateLocationInput {
  @Field()
  id: string;

  @Field()
  country?: string;

  @Field()
  city?: string;

  @Field()
  placeName?: string;

  @Field(() => LocationTypeEnum)
  type: LocationTypeEnum;

  @Field()
  latitude?: number;

  @Field()
  longitude?: number;
}
