import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Travel } from './travels';

export enum LocationTypeEnum {
  AIRPORT = 'AIRPORT',
  PLACE = 'PLACE',
}

registerEnumType(LocationTypeEnum, {
  name: 'LocationTypeEnum',
  description: 'Available Locations types enum',
});

@ObjectType('Location')
export class Location {
  @Field(() => ID)
  id: string;

  @Field()
  placeName: string;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field(() => LocationTypeEnum)
  type: LocationTypeEnum;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field(() => [Travel])
  travels: Travel[];
}
