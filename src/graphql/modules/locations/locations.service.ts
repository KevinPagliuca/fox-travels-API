import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateLocationInput, UpdateLocationInput } from '../../inputs/location.input';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLocations() {
    return await this.prisma.location.findMany();
  }

  async getLocationById(id: string) {
    return await this.prisma.location.findUnique({
      where: { id },
    });
  }

  async getMyLocations(userId: string) {
    return await this.prisma.location.findMany({
      where: { createdByUserId: userId },
    });
  }

  async createLocation(data: CreateLocationInput, userId: string) {
    const isLocationAlreadyExists = await this.prisma.location.findFirst({
      where: { country: data.country, city: data.city },
    });

    if (isLocationAlreadyExists) throw new BadRequestException('Location already exists');

    return await this.prisma.location.create({
      data: {
        ...data,
        createdByUserId: userId,
      },
    });
  }

  async updateLocation(data: UpdateLocationInput, userId: string) {
    if (userId) throw new BadRequestException('You must provide userId to updating a location');

    const isUserAuthorizedToUpdateLocation = await this.prisma.location.findFirst({
      where: { id: data.id, createdByUserId: userId },
    });

    if (!isUserAuthorizedToUpdateLocation)
      throw new UnauthorizedException("You aren't authorized to update this location, or location doesn't exist");

    return await this.prisma.location.update({
      where: { id: data.id },
      data,
    });
  }

  async deleteLocation(id: string, userId: string) {
    if (!userId) throw new BadRequestException('You must have be authenticated to can delete the location');

    const isUserAuthorizedToDeleteLocation = await this.prisma.location.findFirst({
      where: { id, createdByUserId: userId },
    });

    if (!isUserAuthorizedToDeleteLocation)
      throw new UnauthorizedException("You aren't authorized to delete this location, or location doesn't exist");

    return await this.prisma.location.delete({
      where: { id },
    });
  }
}
