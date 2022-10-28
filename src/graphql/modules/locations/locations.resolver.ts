import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateLocationInput, UpdateLocationInput } from '../../inputs/location.input';
import { Location } from '../../models/location';
import { LocationsService } from './locations.service';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Query(() => [Location])
  async getAllLocations() {
    return await this.locationsService.getAllLocations();
  }

  @Query(() => Location)
  async getLocationById(@Args('id') id: string) {
    return await this.locationsService.getLocationById(id);
  }

  @Mutation(() => Location)
  async createLocation(@Args('data') data: CreateLocationInput) {
    return await this.locationsService.createLocation(data);
  }

  @Mutation(() => Location)
  async updateLocation(@Args('data') data: UpdateLocationInput) {
    return await this.locationsService.updateLocation(data);
  }

  @Mutation(() => Location)
  async deleteLocation(@Args('id') id: string) {
    return await this.locationsService.deleteLocation(id);
  }
}
