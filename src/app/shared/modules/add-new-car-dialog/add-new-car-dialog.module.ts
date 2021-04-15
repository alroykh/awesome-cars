import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { CarFormModule } from './../car-form/car-form.module';
import { AddNewCarDialogComponent } from './add-new-car-dialog.component';

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
