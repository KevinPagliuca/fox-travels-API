import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../guards/authorization.guard';
import { CurrentUser } from '../../guards/current-user';
import { CreateLocationInput, UpdateLocationInput } from '../../inputs/location.input';
import { Location } from '../../models/location';
import { Travel } from '../../models/travels';
import { UserWithToken } from '../../models/user';
import { TravelsService } from '../travels/travels.service';
import { LocationsService } from './locations.service';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService, private readonly travelsService: TravelsService) {}

  @Query(() => [Location])
  async getAllLocations() {
    return await this.locationsService.getAllLocations();
  }

  @Query(() => Location)
  async getLocationById(@Args('id') id: string) {
    return await this.locationsService.getLocationById(id);
  }

  @Query(() => [Location])
  @UseGuards(AuthorizationGuard)
  async getMyLocations(@CurrentUser() { user }: UserWithToken) {
    return await this.locationsService.getMyLocations(user.id);
  }

  @Mutation(() => Location)
  @UseGuards(AuthorizationGuard)
  async createLocation(@CurrentUser() { user }: UserWithToken, @Args('data') data: CreateLocationInput) {
    return await this.locationsService.createLocation(data, user.id);
  }

  @Mutation(() => Location)
  @UseGuards(AuthorizationGuard)
  async updateLocation(@CurrentUser() { user }: UserWithToken, @Args('data') data: UpdateLocationInput) {
    return await this.locationsService.updateLocation(data, user.id);
  }

  @Mutation(() => String)
  @UseGuards(AuthorizationGuard)
  async deleteLocation(@CurrentUser() { user }: UserWithToken, @Args('id') id: string) {
    await this.locationsService.deleteLocation(id, user.id);
    return 'Location deleted successfully';
  }

  @ResolveField(() => [Travel])
  async travels(@Parent() location: Location) {
    return await this.travelsService.getTravelsByLocationId(location.id);
  }
}
