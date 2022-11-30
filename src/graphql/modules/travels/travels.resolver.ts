import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateTravelInput, UpdateTravelInput } from '../../inputs/travels.input';
import { Location } from '../../models/location';
import { Travel } from '../../models/travels';
import { LocationsService } from '../locations/locations.service';
import { TravelsService } from './travels.service';

@Resolver(() => Travel)
export class TravelsResolver {
  constructor(private readonly travelsService: TravelsService, private readonly locationsService: LocationsService) {}

  @Query(() => [Travel])
  async getAllTravels() {
    return await this.travelsService.getAllTravels();
  }

  @Query(() => Travel)
  async getTravelById(@Args('id') id: string) {
    return await this.travelsService.getTravelById(id);
  }

  @Mutation(() => Travel)
  async createTravel(@Args('data') data: CreateTravelInput) {
    return await this.travelsService.createTravel(data);
  }

  @Mutation(() => Travel)
  async updateTravel(@Args('data') data: UpdateTravelInput) {
    return await this.travelsService.updateTravel(data);
  }

  @Mutation(() => Travel)
  async deleteTravel(@Args('id') id: string) {
    return await this.travelsService.deleteTravel(id);
  }

  @ResolveField(() => Location)
  async location(@Parent() travel: Travel) {
    return await this.locationsService.getLocationById(travel.locationId);
  }
}
