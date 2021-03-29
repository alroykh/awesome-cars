import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { DEALERS } from '../../../assets/data/data.constants';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataServiceDealers implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  public createDb() {
    const dealers = DEALERS;
    return { dealers };
  }
}
