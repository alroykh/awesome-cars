import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PageNotFoundModule { }
