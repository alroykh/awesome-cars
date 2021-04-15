import { OnDestroy } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { CarsService } from 'src/app/main/cars/cars.service';
import { DealersService } from 'src/app/main/dealers/dealers.service';
import { DealerItem } from '../dealer-item/dealer-item.interface';
import { CarItem } from './car-item.interface';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss'],
})
export class CarItemComponent implements OnInit, OnDestroy {
  likedToggleButton = false;

  @Input() car: CarItem;
  @Input() smallView = false;
  @Input() dealer: DealerItem;
  cars: Array<CarItem> = new Array<CarItem>();

  carName = '';
  isAlive = true;

  constructor(
    private carsService: CarsService,
    private dealerService: DealersService
  ) {}

  ngOnInit(): void {}

  doLikeToggle(): void {
    this.addToFavorite();
  }

  addToFavorite(): void {
    const carToUpdate = { ...this.car, liked: !this.car.liked };
    this.carsService
      .updateCar(carToUpdate)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => {
        this.car = carToUpdate;
      });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
