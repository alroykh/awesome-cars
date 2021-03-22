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
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  @Input() car?: CarItem;

  cars: CarItem[] = new Array<CarItem>();
  selectedCar: CarItem;
  defaultCar: CarItem | null;


  carsCategoryView = false;
  carsCategories: Set<string> = new Set();

  allCars: CarItem[] = [];
  carsByCategory: CarItem[] = new Array<CarItem>();

  selectedCategory: CarItem[] = new Array<CarItem>();

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  // getCars(): void {
  //   this.carsService.getCarsByParams()
  //     .subscribe(cars => this.cars = cars);
  // }

  // working code, but 'other' in the middle
  // getCategories(): void {
  //   this.carsService.getCars().subscribe((cars) => {
  //     this.cars = cars;
  //     this.cars.forEach((item) =>
  //       item.category ? this.carsCategory.add(item.category) : this.carsCategory.add('Other')
  //     );
  //   });
  // }

  getCategories(): void {
    this.carsService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.cars.forEach((item) => {
        if (item.category != null) {
          this.carsCategories.add(item.category);
        }
      });
      this.carsCategories.add('Other');
    });
    // console.log(this.carsCategories);

  }

  getCarsByCategory(category: string): CarItem[] {
    // this.carsService.getCars().subscribe((cars) => {
    //   this.allCars = cars;
    // });
    // return this.allCars.filter(item =>
    //   category === 'Other' ? !item.category : item.category === category );
    this.carsByCategory = this.cars.filter(item =>
        category === 'Other' ? !item.category : item.category === category );
    // this.defaultCar = this.carsByCategory[0];
    return this.carsByCategory;
  }


  filterCars(value: string): void {
    forkJoin([
      this.carsService.getCarsByParams({ model: value }),
      this.carsService.getCarsByParams({ brand: value }),
    ])
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
      .subscribe((cars) => (this.cars = cars));
  }

  selectCar(car: CarItem): void {
    // this.defaultCar = this.carsByCategory[0];
    this.selectedCar = car;
  }
}
