import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { finalize, takeWhile } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { DealersService } from './dealers.service';
import { DealerItem } from 'src/app/shared/modules/dealer-item/dealer-item.interface';
import { ConfirmDialogComponent } from './../../shared/modules/confirm-dialog/confirm-dialog.component';
import { DealerDialogComponent } from './../../shared/modules/dealer-dialog/dealer-dialog.component';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss'],
})
export class DealersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'name',
    'amountOfCars',
    'headquarters',
    'country',
    'foundedIn',
    'editDealer',
    'deleteDealer',
  ];
  dataSource: MatTableDataSource<DealerItem>;
  dealers: DealerItem[];
  action: boolean;

  loading = false;
  isAlive = true;
  passedData: DealerItem;

  constructor(
    private dealerService: DealersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.dealerService
      .getDealers()
      .pipe(
        takeWhile(() => (this.isAlive = true)),
        finalize(() => (this.loading = false))
      )
      .subscribe((dealers) => {
        this.dealers = dealers;
        this.dataSource = new MatTableDataSource(this.dealers);
        //
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  updateTable(): void {
    this.dealerService
      .getDealers()
      .pipe(takeWhile(() => (this.isAlive = true)))
      .subscribe((dealers) => {
        this.dealers = dealers;
        this.dataSource = new MatTableDataSource(this.dealers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  filterDealers(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDealerDialog(obj = null): void {
    const dialogRef = this.dialog.open(DealerDialogComponent, {
      width: '300px',
      data: obj,
    });

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => (this.isAlive = true)))
      .subscribe((result) => {
        this.passedData = result.data;
        if (result.data.newRecord === true) {
          this.dealerService.addDealer(this.passedData).subscribe();
        } else if (result.data.newRecord === false) {
          this.dealerService.updateDealer(this.passedData).subscribe();
        }
        this.updateTable();
      });
  }

  deleteDealer(dealer: DealerItem): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Dealer',
        message: 'Are you sure, you want to remove ' + dealer.name + ' dealer?',
      },
    });
    confirmDialog
      .afterClosed()
      .pipe(takeWhile(() => (this.isAlive = true)))
      .subscribe((result) => {
        if (result === true) {
          this.dealerService.deleteDealer(dealer).subscribe();
          this.updateTable();
        }
      });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
