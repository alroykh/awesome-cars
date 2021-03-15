import { Component, Input, OnInit } from '@angular/core';
import { CarItem } from './car-item.interface';



@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent implements OnInit {
  likeToggle = false;
  likedToggleButton = false;

  @Input() car: CarItem;

  constructor() { }

  ngOnInit(): void {
  }


  doLikeToggle(): void{
   this.likeToggle = !this.likeToggle;
   // Do some other stuff needed
 }

  addToFavorite(): void {

 }

  deleteFromFavorite(): void {

 }

}
