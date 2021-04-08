import { forkJoin } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { CarsService } from '../cars/cars.service';
import { DealersService } from '../dealers/dealers.service';
import { CarItem } from '../../shared/modules/car-item/car-item.interface';
import { DealerDialogComponent } from '../../shared/modules/dealer-dialog/dealer-dialog.component';
import { MyDealersComponent } from '../my-dealers/my-dealers.component';
// import { CarDialogComponent } from 'src/app/shared/modules/car-dialog/car-dialog.component';
import { DealerItem } from 'src/app/shared/modules/dealer-item/dealer-item.interface';
import { AddNewCarDialogComponent } from 'src/app/shared/modules/add-new-car-dialog/add-new-car-dialog.component';
import { map, tap } from 'rxjs/operators';

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
  newAddedCars: Array<CarItem> = new Array<CarItem>();

  carsCategoryView = false;
  passedData: DealerItem;
  passedCar: CarItem;

  isLikedLoading = false;
  isCarsLoading = false;
  isDealersLoading = false;

  constructor(
    private carsService: CarsService,
    public dialog: MatDialog,
    public dealerService: DealersService
  ) {}

  ngOnInit(): void {
    this.getCars();
    this.getNewAddedCars();
    this.getNewAddedDealers();
  }

  getCars(): void {
    this.isLikedLoading = true;
    this.carsService.getCarsByParams({ liked: true }).subscribe((cars) => {
      this.cars = cars;
      this.isLikedLoading = false;
    });
  }

  getNewAddedCars(): void {
    this.isCarsLoading = true;

    this.carsService.getAllCars().subscribe((cars) => {
      this.newAddedCars = cars.filter((car) => car.newItem);
      this.isCarsLoading = false;
    });
  }

  getNewAddedDealers(): void {
    this.isDealersLoading = true;

    this.dealerService.getDealers().subscribe((dealers) => {
      this.newAddedDealers = dealers.filter((dealer) => dealer.newRecord);
      this.isDealersLoading = false;
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

  openCarDialog(): void {
    const dialogRef = this.dialog.open(AddNewCarDialogComponent, {
      width: '350px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.passedCar = result.data;
        this.carsService.addCar(this.passedCar).subscribe();
        this.newAddedCars.push(this.passedCar);
      }
    });
  }
}
