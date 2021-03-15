import { Component, OnInit } from '@angular/core';

import { CarItem } from '../../shared/modules/car-item/car-item.interface';
import { CARS } from '../../../assets/data/data.constants';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})

export class CarsComponent implements OnInit {

  cars: CarItem[] = CARS;

  carsCategoryView = false;

  constructor() { }

  ngOnInit(): void {
  }

}
