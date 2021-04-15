import { Component, Inject, OnDestroy, OnInit, Optional, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeWhile } from 'rxjs/operators';

import { DealersService } from 'src/app/main/dealers/dealers.service';
import { DealerItem, initDealer } from '../dealer-item/dealer-item.interface';

@Component({
  selector: 'app-dealer-dialog',
  templateUrl: './dealer-dialog.component.html',
  styleUrls: ['./dealer-dialog.component.scss'],
})
export class DealerDialogComponent implements OnInit, OnDestroy {
  action: boolean;

  localData: any;
  dealer: DealerItem;
  dealers: DealerItem[];

  showError = false;
  isAlive = true;

  constructor(
    public dialogRef: MatDialogRef<DealerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DealerItem,
    private dealerService: DealersService
    
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.action = !!this.data;
    this.localData = this.data ? { ...this.data } : initDealer();

    this.dealerService
      .getDealers()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((dealers) => (this.dealers = dealers));

    this.data
      ? // tslint:disable-next-line:no-unused-expression
        (this.dealer = { ...this.data }) && (this.action = true)
      : (this.dealer = initDealer());
  }

  saveAction(): void {
    const editedDealer = {
      ...this.dealer,
      id: this.dealer.id.toUpperCase(),
      registrationDate: this.action ? this.dealer.registrationDate : new Date(),
    };
    this.dialogRef.close({
      event: 'close',
      data: editedDealer,
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  check(): void {
    this.showError = !!this.dealers.find(
      (elem) => elem.id === this.dealer.id.toUpperCase()
    );
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
