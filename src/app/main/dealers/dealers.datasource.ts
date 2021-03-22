import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { DealerItem } from 'src/app/shared/modules/dealer-item/dealer-item.interface';
import { DealersService } from './dealers.service';

export class DealersDataSource implements DataSource<DealerItem> {
  private dealersSubject = new BehaviorSubject<DealerItem[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dealersService: DealersService) {}

  loadDealers(
    name: string,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): void {
    this.loadingSubject.next(true);

    this.dealersService
      .findDealers(name, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((dealers) => this.dealersSubject.next(dealers));

    console.log('Data source: ', this.dealersService);
  }

  connect(collectionViewer: CollectionViewer): Observable<DealerItem[]> {
    console.log('Connecting data source');
    return this.dealersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dealersSubject.complete();
    this.loadingSubject.complete();
  }
}
