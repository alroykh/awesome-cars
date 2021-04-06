import { DealersService } from 'src/app/main/dealers/dealers.service';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CarItem } from '../car-item/car-item.interface';
import { CarsService } from 'src/app/main/cars/cars.service';
import { finalize, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
// import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DealerItem } from '../dealer-item/dealer-item.interface';
import { FormDataOutput } from '../car-form/car-form.component';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit, OnChanges {
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
  // sub: Subscription;
  editFormData: FormDataOutput;

  @ViewChild('dialog') template: TemplateRef<HTMLElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carsService: CarsService,
    public dialog: MatDialog,
    private location: Location,
    private formBuilder: FormBuilder,
    public dealerService: DealersService
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.isLoading = true;
    // this.sub =
    this.route.paramMap
      .pipe(
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
        // if (!this.action) {
        //   this.formBuild();
        // }
        // this.formBuild();
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

  onEdit(): void {
    // this.router.navigate([`/cars/${this.id}/edit`]);
    this.isEdit = true;
    this.router.navigate(['/cars', `${this.id}`, 'edit']);

    // this.location.replaceState(`/cars/${this.id}/edit`);
  }

  formData(data: FormDataOutput): void {
    // this.editFormData = { ...data, data: { ...data.data, id: this.car.id } };
    this.editFormData = data;
  }

  saveAction(): void {
    // debugger;
    if (
      !this.editFormData ||
      !this.editFormData.isFormValid ||
      !this.editFormData.data
    ) {
      return;
    }

    this.carsService.updateCar(this.editFormData.data).subscribe(() => {
      this.isEdit = false;
      // this.location.replaceState(`/cars/${this.id}`);
      this.router.navigate(['cars/', `${this.id}`]);
      this.car = this.editFormData.data;
    });
  }

  cancelAction(): void {
    this.isEdit = false;
    this.router.navigate(['cars/', `${this.id}`]);
    // this.location.replaceState(`/cars/${this.id}`);
  }
}
