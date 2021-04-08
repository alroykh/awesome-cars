import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { CarItem } from './../car-item/car-item.interface';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() car: CarItem;
  @Input() editMode = false;
  @Output() cancel = new EventEmitter();
  @Output() saveDetails = new EventEmitter();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}
}
