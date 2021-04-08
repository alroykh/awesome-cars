import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { CarsService } from 'src/app/main/cars/cars.service';
import { CarItem } from 'src/app/shared/modules/car-item/car-item.interface';
import { getUniqueId } from 'src/app/helpers/get-unique-id.helper';

@Component({
  selector: 'app-add-new-car-dialog',
  templateUrl: './add-new-car-dialog.component.html',
  styleUrls: ['./add-new-car-dialog.component.scss'],
})
export class AddNewCarDialogComponent implements OnInit {
  cars: CarItem[];

  constructor(
    private dialogRef: MatDialogRef<AddNewCarDialogComponent>,
    private carService: CarsService
  ) {}

  ngOnInit(): void {}

  saveCarData(data: CarItem): void {
    this.saveAction(data);
  }

  saveAction(data: CarItem): void {
    const newCar: CarItem = { ...data, id: getUniqueId() };
    this.dialogRef.close({
      event: 'close',
      data: newCar,
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
