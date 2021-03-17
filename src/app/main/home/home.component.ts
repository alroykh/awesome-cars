import { Component, OnInit, Input } from '@angular/core';

import { CarItem } from '../../shared/modules/car-item/car-item.interface';

import { FormControl } from '@angular/forms';
import { CarsService } from '../cars/cars.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: CarItem[] = [];

  filterControl = new FormControl();
  carsCategoryView = false;


  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carsService.getCarsByParams({liked: true})
      .subscribe(cars => {
        this.cars = cars;
      });
  }
}
