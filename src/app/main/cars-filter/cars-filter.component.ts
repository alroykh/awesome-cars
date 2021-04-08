import { Component, Output, EventEmitter, Input } from '@angular/core';
import { OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeWhile } from 'rxjs/operators';

import { CarsService } from './../cars/cars.service';
import { CarItem } from './../../shared/modules/car-item/car-item.interface';

@Component({
  selector: 'app-cars-filter',
  templateUrl: './cars-filter.component.html',
  styleUrls: ['./cars-filter.component.scss'],
})
export class CarsFilterComponent implements OnInit, OnDestroy, OnChanges {
  @Output() filterValue: EventEmitter<string> = new EventEmitter<string>();
  @Input() val = '';

  public value = '';
  public cars$: Observable<CarItem[]>;

  private searchTerms = new Subject<string>();

  private filterSubsription: Subscription;
  private isAlive = true;

  public constructor(private carsService: CarsService) {}

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public ngOnInit(): void {
    this.filterSubsription = this.searchTerms
      .pipe(
        debounceTime(300),
        takeWhile(() => (this.isAlive = true)),
        distinctUntilChanged()
      )
      .subscribe((term: string) => {
        this.filterValue.emit(term);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.val && changes.val.firstChange) {
      this.value = this.val;
    }
  }

  public resetValue(): void {
    this.value = '';
    this.filterValue.emit(this.value);
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }
}
