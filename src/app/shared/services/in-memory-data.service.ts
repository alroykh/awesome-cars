import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CARS, DEALERS } from '../../../assets/data/data.constants';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  public createDb() {
    const cars = CARS;
    const dealers = DEALERS;
    return { cars, dealers };
  }
}
