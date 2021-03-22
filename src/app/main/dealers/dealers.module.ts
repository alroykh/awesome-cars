import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealersComponent } from './dealers.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
// import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [DealersComponent],
  imports: [
    CommonModule,
    // when trying to add next three modules app crashed
    // BrowserModule,
    // BrowserAnimationsModule,
    // HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    // DealersComponent
  ],
})
export class DealersModule {}
