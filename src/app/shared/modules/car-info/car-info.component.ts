import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CarItem } from '../car-item/car-item.interface';
import { CarsService } from 'src/app/main/cars/cars.service';
import { finalize, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit, OnChanges {
  car: CarItem;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carsService: CarsService,
    public dialog: MatDialog
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.getCarById();
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.carsService
            .getCarById(params.get('id'))
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((p) => {
        if (p.image === undefined) {
          p.image = null;
        }
        console.log(this.isLoading);
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
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.carsService.deleteCar(car).subscribe();
        this.onBack();
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/cars']);
  }
}
