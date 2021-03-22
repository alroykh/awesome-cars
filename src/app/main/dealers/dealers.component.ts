import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { DealerItem } from 'src/app/shared/modules/dealer-item/dealer-item.interface';
// import { DEALERS } from 'src/assets/data/data.constants';
import { DealersDataSource } from './dealers.datasource';
import { DealersService } from './dealers.service';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss'],
})
export class DealersComponent implements AfterViewInit, OnInit {
  dealer: DealerItem;
  dataSource: DealersDataSource;
  displayedColumns: string[] = [
    'name',
    'amountOfCars',
    'headquarters',
    'country',
    'foundedIn',
    'editDealer',
    'deleteDealer'
  ];
  // dataSource = new ExampleDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  // displayedColumns = ['name', 'amountOfCars', 'headquarters', 'country', 'foundedIn', 'editDealer'];
  // dealers = DEALERS;

  constructor(
    private dealersService: DealersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // tslint:disable-next-line:no-string-literal
    this.dealer = this.route.snapshot.data['dealer'];
    this.dataSource = new DealersDataSource(this.dealersService);
    this.dataSource.loadDealers(this.dealer.name, '', 'asc', 0, 10);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadDealersPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    // this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadDealersPage()))
      .subscribe();
  }

  loadDealersPage(): void {
    this.dataSource.loadDealers(
      this.dealer.name,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    // console.log(this.dataSource)
  }

  // onRowClicked(row): void {
  //   console.log('Row clicked: ', row);
  // }
}
