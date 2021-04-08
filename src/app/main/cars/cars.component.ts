import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { CarsService } from './cars.service';
import { CarItem } from './../../shared/modules/car-item/car-item.interface';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit, OnDestroy {
  @Input() car?: CarItem;

  cars: CarItem[] = new Array<CarItem>();
  selectedCar: CarItem;
  defaultCar: CarItem | null;

  carsCategoryView = false;
  carsCategories: Set<string> = new Set();
  isAlive = true;

  allCars: CarItem[] = [];
  carsByCategory: CarItem[] = new Array<CarItem>();

  selectedCategory: CarItem[] = new Array<CarItem>();

  isLoading = false;

  public filterValue = '';
  isLastPage = false;
  private activePage = 1;
  private pageSize = 8;

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getCars();
    this.getCategories();
  }

  getCars(): void {
    this.carsService
      .getCars(this.activePage, this.pageSize)
      .pipe(takeWhile(() => (this.isAlive = true)))
      .subscribe(({ list, isLastPage }) => {
        this.cars = [...this.cars, ...list];
        this.isLoading = false;
        this.isLastPage = isLastPage;
      });
  }

  getCategories(): void {
    this.carsService.getCategorizedCars()
    .pipe(takeWhile(() => (this.isAlive = true)))
    .subscribe((cars: CarItem[]) => {
      this.allCars = cars;
      cars.forEach((item) => {
        if (item.category != null) {
          this.carsCategories.add(item.category.toLowerCase());
        }
      });
      this.carsCategories.add('other');
    });
  }

  getCarsByCategory(category: string): CarItem[] {
    this.carsByCategory = this.allCars.filter((item) =>
      category === 'other' ? !item.category : item.category === category
    );
    return this.carsByCategory;
  }

  tabChanged(evt: MatTabChangeEvent): void {
    this.selectCar(
      (this.getCarsByCategory(evt.tab.textLabel.toLowerCase()) || [])[0]
    );
  }

  filterCars(value: string): void {
    this.isLoading = true;
    this.filterValue = value.trim();
    this.activePage = 1;
    this.cars = [];
    this.getFilteredCars();
  }

  getFilteredCars(): void {
    this.carsService
      .getFilteredCars(this.filterValue, this.activePage, this.pageSize)
      .pipe(takeWhile(() => (this.isAlive = true)))
      .subscribe(({ list, isLastPage }) => {
        this.cars = [...this.cars, ...list];
        this.isLoading = false;
        this.isLastPage = isLastPage;
      });
  }

  loadMore(): void {
    this.activePage += 1;
    if (!!this.filterValue.trim()) {
      this.getFilteredCars();
    } else {
      this.getCars();
    }
  }

  selectCar(car: CarItem, category?): void {
    this.selectedCar = car;
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
