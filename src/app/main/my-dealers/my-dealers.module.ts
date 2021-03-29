import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDealersComponent } from './my-dealers.component';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [MyDealersComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
  ],
  exports: [MyDealersComponent]
})
export class MyDealersModule { }
