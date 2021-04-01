import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { CarsService } from '../cars/cars.service';
import { DealersService } from '../dealers/dealers.service';
import { CarItem } from '../../shared/modules/car-item/car-item.interface';
import { DealerItem } from 'src/app/shared/modules/dealer-item/dealer-item.interface';
import { DealerDialogComponent } from '../../shared/modules/dealer-dialog/dealer-dialog.component';
import { MyDealersComponent } from '../my-dealers/my-dealers.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() smallView = true;

  cars: CarItem[] = [];
  dealers: DealerItem[] = [];
  dealer: DealerItem;

  newAddedDealers: Array<DealerItem> = new Array<DealerItem>();

  carsCategoryView = false;
  passedData: DealerItem;

  isLoading = false;

  constructor(
    private carsService: CarsService,
    public dialog: MatDialog,
    public dealerService: DealersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getCars();
    this.getNewAddedDealers();
  }

  getCars(): void {
    this.carsService.getCarsByParams({ liked: true }).subscribe((cars) => {
      this.cars = cars;
    });
  }

  getNewAddedDealers(): void {
    this.dealerService.getDealers().subscribe((dealers) => {
      this.newAddedDealers = dealers.filter((dealer) => dealer.newRecord);
      this.isLoading = false;
    });
  }

  openDealerDialog(): void {
    const dialogRef = this.dialog.open(DealerDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.passedData = result.data;
        this.dealerService.addDealer(this.passedData).subscribe();
        this.newAddedDealers.push(this.passedData);
      }
    });
  }
}
