import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { finalize, switchMap, takeWhile } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';

import { CarsService } from 'src/app/main/cars/cars.service';
import { DealersService } from 'src/app/main/dealers/dealers.service';
import { CarItem } from '../car-item/car-item.interface';
import { DealerItem } from '../dealer-item/dealer-item.interface';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit, OnChanges, OnDestroy {
  car: CarItem;
  cars: Array<CarItem>;
  dealer: DealerItem;
  dealers: Array<DealerItem>;
  isLoading = false;
  isEdit = false;
  id: string;
  action: boolean;
  myForm: FormGroup;
  showError = false;
  isAlive = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carsService: CarsService,
    public dialog: MatDialog,
    public dealerService: DealersService
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.isLoading = true;

    this.route.data.pipe(takeWhile(() => this.isAlive)).subscribe((res) => {
      this.isEdit = res.isEdit;
    });

    this.route.paramMap
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap((params: ParamMap) => {
          this.id = params.get('id');
          return this.carsService
            .getCarById(params.get('id'))
            .pipe(finalize(() => (this.isLoading = false)));
        })
      )
      .subscribe((p) => {
        if (p.image === undefined) {
          p.image = null;
        }

        this.car = p;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  deleteCar(car: CarItem): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Car',
        message: 'Are you sure, you want to remove ' + car.model + ' car?',
      },
    });
    confirmDialog
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((result) => {
        if (result === true) {
          this.carsService.deleteCar(car).subscribe();
          this.onBack();
        }
      });
  }

  onBack(): void {
    this.router.navigate(['/cars']);
  }

  onEdit(): void {
    this.router.navigate(['/cars', `${this.id}`, 'edit']);
  }

  saveCarData(data: CarItem): void {
    this.saveAction(data);
  }

  saveAction(data: CarItem): void {
    this.carsService
      .updateCar(data)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => {
        this.router.navigate(['cars/', `${this.id}`]);
        this.car = data;
      });
  }

  cancelAction(): void {
    this.router.navigate(['cars/', `${this.id}`]);
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
