import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { CarsService } from 'src/app/main/cars/cars.service';
import { CarItem } from './car-item.interface';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})

export class CarItemComponent implements OnInit {
  // likeToggle = false;
  likedToggleButton = false;
  
  @Input() car: CarItem;
  @Input() smallView = false;

  // constructor() { }
  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
  }

  doLikeToggle(): void{
  //  this.likeToggle = !this.likeToggle;
   this.addToFavorite();
 }

  addToFavorite(): void {
    // debugger
    const carToUpdate = {...this.car, liked: !this.car.liked};
    this.carsService.updateCar(carToUpdate)
    .subscribe(() => {
       this.car = carToUpdate;
     });
 }

  deleteFromFavorite(): void {
 }

}
