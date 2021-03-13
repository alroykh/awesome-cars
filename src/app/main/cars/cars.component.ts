import { Component, OnInit } from '@angular/core';

import { CarItem } from '../../shared/modules/car-item/car-item';
import { CARS } from '../../../assets/data/data.constants';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})

export class CarsComponent implements OnInit {

  // cars: CarItem[] = CARS;

  carItem: CarItem = {
    id: '0776681260',
    brand: 'Kenworth',
    model: 'T700',
    year: null,
    color: 'black',
    image: './assets/images/kenworth-t700.jpg',
    liked: false,
    newItem: false
  };

  constructor() { }

  ngOnInit(): void {
  }

}
