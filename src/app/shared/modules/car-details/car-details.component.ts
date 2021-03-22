import { CarItem } from './../car-item/car-item.interface';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  @Input() car: CarItem;

  constructor() { }

  ngOnInit(): void {
  }

}
