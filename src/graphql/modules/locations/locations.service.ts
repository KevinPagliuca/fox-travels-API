import { BadRequestException, Injectable } from '@nestjs/common';

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

  async createLocation(data: CreateLocationInput) {
    const isLocationAlreadyExists = await this.prisma.location.findFirst({
      where: { country: data.country, city: data.city },
    });

    if (isLocationAlreadyExists) throw new BadRequestException('Location already exists');

    return await this.prisma.location.create({
      data,
    });
  }

  async updateLocation(data: UpdateLocationInput) {
    return await this.prisma.location.update({
      where: { id: data.id },
      data,
    });
  }

  async deleteLocation(id: string) {
    return await this.prisma.location.delete({
      where: { id },
    });
  }
}
