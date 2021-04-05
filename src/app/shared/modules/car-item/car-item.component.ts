import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { CarsService } from 'src/app/main/cars/cars.service';
import { DealersService } from 'src/app/main/dealers/dealers.service';
import { DealerItem } from '../dealer-item/dealer-item.interface';
import { CarItem } from './car-item.interface';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss'],
})
export class CarItemComponent implements OnInit {
  likedToggleButton = false;

  @Input() car: CarItem;
  @Input() smallView = false;
  @Input() dealer: DealerItem;
  cars: Array<CarItem> = new Array<CarItem>();

  carName = '';

  constructor(
    private carsService: CarsService,
    private dealerService: DealersService
  ) {}

  ngOnInit(): void {
    // this.compareCarName();
  }

  // compareCarName() {
  //   this.cars.forEach((elem) => {
  //     if (elem.brand === this.dealer.id) {
  //       this.carName = this.dealer.name;
  //     }
  //   });
  // }

  doLikeToggle(): void {
    this.addToFavorite();
  }

  addToFavorite(): void {
    const carToUpdate = { ...this.car, liked: !this.car.liked };
    this.carsService.updateCar(carToUpdate).subscribe(() => {
      this.car = carToUpdate;
    });
  }

  deleteFromFavorite(): void {}
}
