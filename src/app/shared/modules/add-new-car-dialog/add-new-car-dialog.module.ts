import { CarFormModule } from './../car-form/car-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewCarDialogComponent } from './add-new-car-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [AddNewCarDialogComponent],
  imports: [
    CommonModule,
    CarFormModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports:[AddNewCarDialogComponent]
})
export class AddNewCarDialogModule { }
