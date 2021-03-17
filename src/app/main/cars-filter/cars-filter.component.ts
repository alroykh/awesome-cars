import { RouterModule } from '@angular/router';

import { CarsService } from './../cars/cars.service';
import { CarItem } from './../../shared/modules/car-item/car-item.interface';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import {Observable, Subject, Subscription } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cars-filter',
  templateUrl: './cars-filter.component.html',
  styleUrls: ['./cars-filter.component.scss']
})
export class CarsFilterComponent implements OnInit, OnDestroy {
  @Output() filterValue: EventEmitter<string> = new EventEmitter<string>();

  public cars$: Observable<CarItem[]>;

  private searchTerms = new Subject<string>();

  private filterSubsription: Subscription;

  public constructor(private carsService: CarsService) { }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  // addNewItem(car: CarItem): void {
  //   this.filteredCars.emit(car);
  // }

  ngOnInit(): void {
    this.filterSubsription = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // switchMap((term: string) => this.carsService.searchCars(term))
    )
    .subscribe((term: string) => {
      this.filterValue.emit(term);
    });
  }

  ngOnDestroy(): void {
    if (this.filterSubsription) {
      this.filterSubsription.unsubscribe();
    }
  }

}
