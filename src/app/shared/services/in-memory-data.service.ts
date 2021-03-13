import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api' ;
import { CARS } from '../../../assets/data/data.constants';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cars = CARS;
    return { cars };
  }
}
