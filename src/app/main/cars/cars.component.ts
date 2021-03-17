import { CarItem } from './../../shared/modules/car-item/car-item.interface';
import { CarsService } from './cars.service';
import { Component, Input, OnInit } from '@angular/core';

// import { CARS } from '../../../assets/data/data.constants';
import { FormControl } from '@angular/forms';
import { concat, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})

export class CarsComponent implements OnInit {

  cars: CarItem[] = [];

  carsCategoryView = false;

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carsService.getCarsByParams()
      .subscribe(cars => this.cars = cars);
  }

  filterCars(value: string): void {
    forkJoin([this.carsService.getCarsByParams({model: value}), this.carsService.getCarsByParams({brand: value})])
    .pipe(
      map(([carsByModel, carsByBrand]: Array<CarItem[]>) => {
        const uniqueCars = [];
        const unitedArray: CarItem[] = [...carsByModel, ...carsByBrand];
        const uniqueCarsMap = new Map<string, CarItem>();

        // const carsByCategory = {};


        unitedArray.forEach((item: CarItem) => {
          uniqueCarsMap.set(item.id, item);

        // for view by category
        // carsByCategory[item.category] = (carsByCategory[item.category] || []).concat(item);
        // return carsByCategory;

        });


        for (const val of uniqueCarsMap.values()) {
          uniqueCars.push(val);
        }
        // console.log('uniqueCars: ', uniqueCars);
        return uniqueCars;

      })
    )
    .subscribe(cars => this.cars = cars);
  }

}
