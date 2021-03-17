import { Component, OnInit } from '@angular/core';

import { CarItem } from '../car-item/car-item.interface';
import { CARS } from '../../../../assets/data/data.constants';



@Component({
  selector: 'app-car-category',
  templateUrl: './car-category.component.html',
  styleUrls: ['./car-category.component.scss']
})
export class CarCategoryComponent implements OnInit {

  cars: CarItem[] = CARS;
  type = {category: 'coupe'};

 
  constructor() { }

  ngOnInit(): void {
  }

}
