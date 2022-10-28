import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { map, catchError } from 'rxjs';
@Injectable()
export class ApiService {
  constructor(private http: HttpService) {}

  async getLocation(address: string) {
    const params = {
      access_token: process.env.MAPBOX_API_KEY,
      limit: 1,
      types: 'place,postcode,address,region,country,district,neighborhood,locality',
    };

    return this.http
      .get(`${process.env.MAPBOX_URL}${address}.json?`, { params })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }
}
