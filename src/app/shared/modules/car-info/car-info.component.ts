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
  // sub: Subscription;

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
        this.formBuild();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  // ngOnDestroy() {}

  formBuild(): void {
    this.myForm = this.formBuilder.group({
      id: [this.car.id],
      model: [this.car.model, [Validators.required]],
      dealer: [this.car.brand, [Validators.required]],
      class: [this.car.class],
      year: [this.car.year],
      color: [this.car.color],
      wikilink: [
        this.car.wikilink,
        [
          Validators.pattern(
            /^((ftp|http|https):\/\/)?(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9\-]*\.?)*\.{1}[A-Za-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
          ),
        ],
      ],
      description: [this.car.description],
      image: [this.car.image],
    });
  }

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
    this.location.replaceState(`/cars/${this.id}/edit`);
  }
}
