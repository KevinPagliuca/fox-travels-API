import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTravelInput {
  @Field()
  title: string;

  @Field()
  minPrice: number;

  @Field()
  maxPrice?: number;

  @Field()
  pricePerMiles: number;

  @Field()
  easyVisa?: boolean;

  @Field()
  locationId: string;
}

@InputType()
export class UpdateTravelInput {
  @Field()
  id: string;

  @Field()
  title?: string;

  @Field()
  startDate?: Date;

  @Field()
  endDate?: Date;

  @Field()
  price?: number;

  @Field()
  discount?: number;

  @Field()
  userId?: string;

  @Field()
  locationId?: string;
}
