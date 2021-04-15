import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, takeWhile } from 'rxjs/operators';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { CarsService } from './cars.service';
import { CarItem } from './../../shared/modules/car-item/car-item.interface';
import { FormControl } from '@angular/forms';

export interface CarsTrimmed {
  list: CarItem[];
  isLastPage: boolean;
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit, OnDestroy {
  @Input() car?: CarItem;

  cars: CarItem[] = new Array<CarItem>();
  selectedCar: CarItem;
  // defaultCar: CarItem | null;
  carsCategoryView = false;
  carsCategories: Set<string> = new Set();
  isAlive = true;
  allCars: CarItem[] = [];
  carsByCategory: CarItem[] = new Array<CarItem>();
  // selectedCategory: CarItem[] = new Array<CarItem>();
  isLoading = false;
  // valueFilter: string;
  public filterValue = '';
  public isLastPage = false;
  private activePage = 1;
  private pageSize = 8;
  public filterFieldControl: FormControl = new FormControl();
  filteredCars: CarItem[] = new Array<CarItem>();

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.carsService.getAllCars().subscribe((res) => {
      this.cars = res;
      this.setFilteredCars(
        this.getTrimmedCars(this.cars, this.activePage, this.pageSize)
      );
    });
    this.getCategories();
    this.handleFilter();
  }

  setFilteredCars({ list, isLastPage }: CarsTrimmed): void {
    this.filteredCars = [...this.filteredCars, ...list];
    this.isLoading = false;
    this.isLastPage = isLastPage;
  }

  getCategories(): void {
    this.carsService
      .getCategorizedCars()
      .pipe(takeWhile(() => (this.isAlive = true)))
      .subscribe((cars: CarItem[]) => {
        this.allCars = cars;
        cars.forEach((item) => {
          item.category && this.carsCategories.add(item.category.toLowerCase());
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

  private getTrimmedCars(
    carList: CarItem[],
    page: number,
    size: number = 8
  ): CarsTrimmed {
    const startIndex = page === 1 ? 0 : (page - 1) * size;
    const endIndex = startIndex + size;
    const carsTrimmed = {
      list: carList.slice(startIndex, startIndex + size),
      isLastPage: carList.length - 1 <= endIndex,
    };
    return carsTrimmed;
  }

  handleFilter(): void {
    this.filterFieldControl.valueChanges
      .pipe(
        takeWhile(() => this.isAlive),
        debounceTime(1500)
      )
      // tslint:disable-next-line: deprecation
      .subscribe((value) => {
        this.activePage = 1;
        this.isLastPage = false;
        this.isLoading = true;
        this.filteredCars = [];
        if (!value || !value.trim()) {
          this.setFilteredCars(
            this.getTrimmedCars(this.cars, this.activePage, this.pageSize)
          );
        } else {
          const filteredCars = this.cars.filter(
            (car) =>
              car.dealerName.toLowerCase().includes(value.toLowerCase()) ||
              car.model.toLowerCase().includes(value.toLowerCase())
          );
          this.setFilteredCars(
            this.getTrimmedCars(filteredCars, this.activePage, this.pageSize)
          );
        }
      });
  }

  public resetValue(): void {
    this.filterFieldControl.reset();
  }

  loadMore(): void {
    this.activePage += 1;
    this.isLoading = true;
    const filterValue = (this.filterFieldControl.value || '').trim();
    const carsList = !filterValue
      ? this.cars
      : this.cars.filter(
          (car) =>
            car.dealerName.toLowerCase().includes(filterValue) ||
            car.model.toLowerCase().includes(filterValue)
        );
    this.setFilteredCars(
      this.getTrimmedCars(carsList, this.activePage, this.pageSize)
    );
  }

  selectCar(car: CarItem, category?): void {
    this.selectedCar = car;
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
