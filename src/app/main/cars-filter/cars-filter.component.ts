import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
// import { RouterModule } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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

  public constructor(private carsService: CarsService) {}

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.filterSubsription = this.searchTerms
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term: string) => {
        this.filterValue.emit(term);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.val && changes.val.firstChange) {
      this.value = this.val;
    }
  }
  
  resetValue(): void {
    this.value = '';
    this.filterValue.emit(this.value);
  }

  ngOnDestroy(): void {
    if (this.filterSubsription) {
      this.filterSubsription.unsubscribe();
    }
  }
}
