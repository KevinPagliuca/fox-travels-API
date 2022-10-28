import { Controller, Get } from '@nestjs/common';

import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('')
  getBitcoinPrice() {
    // return this.apiService.getLocation('Rua dr. jorge queirós de morais, 78');
    return this.apiService.getLocation('Aeroporto de Guarulhos, São Paulo');
  }
}
