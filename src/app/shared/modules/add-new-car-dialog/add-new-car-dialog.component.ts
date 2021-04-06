import { CarsService } from 'src/app/main/cars/cars.service';
import { CarItem } from 'src/app/shared/modules/car-item/car-item.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormDataOutput } from '../car-form/car-form.component';
import { getUniqueId } from 'src/app/helpers/get-unique-id.helper';

@Component({
  selector: 'app-add-new-car-dialog',
  templateUrl: './add-new-car-dialog.component.html',
  styleUrls: ['./add-new-car-dialog.component.scss'],
})
export class AddNewCarDialogComponent implements OnInit {
  addNewCarData: FormDataOutput;
  cars: CarItem[];
  isSaving = false;

  constructor(
    private dialogRef: MatDialogRef<AddNewCarDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data,
    private carService: CarsService
  ) {}

  ngOnInit(): void {}

  formData(data: FormDataOutput): void {
    // this.editFormData = { ...data, data: { ...data.data, id: this.car.id } };
    this.addNewCarData = data;
  }

  saveAction(): void {
    if (
      !this.addNewCarData ||
      !this.addNewCarData.isFormValid ||
      !this.addNewCarData.data
    ) {
      return;
    }
    this.isSaving = true;
    const newCar: CarItem = { ...this.addNewCarData.data, id: getUniqueId() };
    this.carService.addCar(newCar).subscribe(() => {
      this.dialogRef.close({
        event: 'close',
        data: newCar,
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}