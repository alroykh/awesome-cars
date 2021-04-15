import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DealerDialogModule } from 'src/app/shared/modules/dealer-dialog/dealer-dialog.module';
import { DealerDialogComponent } from 'src/app/shared/modules/dealer-dialog/dealer-dialog.component';
import { DealersComponent } from './dealers.component';

@NgModule({
  declarations: [DealersComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    DealerDialogModule,
    MatProgressBarModule,
  ],
  entryComponents: [DealerDialogComponent],
  exports: [DealersComponent],
})
export class DealersModule {}
