import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateTravelInput, UpdateTravelInput } from '../../inputs/travels.input';

@Injectable()
export class TravelsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTravels() {
    return await this.prisma.travel.findMany();
  }

  async getTravelById(id: string) {
    return await this.prisma.travel.findUnique({
      where: { id },
    });
  }

  async createTravel(data: CreateTravelInput) {
    if (!location) throw new BadRequestException('Location not found');

    return await this.prisma.travel.create({
      data,
    });
  }

  async updateTravel(data: UpdateTravelInput) {
    return await this.prisma.travel.update({
      where: { id: data.id },
      data,
    });
  }

  async deleteTravel(id: string) {
    return await this.prisma.travel.delete({
      where: { id },
    });
  }
}
