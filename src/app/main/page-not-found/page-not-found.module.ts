import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [
    // PageNotFoundComponent
  ],
})
export class PageNotFoundModule {}
