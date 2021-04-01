import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CarItem } from '../car-item/car-item.interface';
import { CarsService } from 'src/app/main/cars/cars.service';
import { finalize, switchMap } from 'rxjs/operators';

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
    private carsService: CarsService
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.getCarById();
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.carsService.getCarById(params.get('id'))
        )
      )
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((p) => {
        if (p.image === undefined) {
          p.image = null;
        }
        this.car = p;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
