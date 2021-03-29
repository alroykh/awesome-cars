import { Component, Inject, OnInit, Optional, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DealersService } from 'src/app/main/dealers/dealers.service';
import { DealerItem, initDealer } from '../dealer-item/dealer-item.interface';

@Component({
  selector: 'app-dealer-dialog',
  templateUrl: './dealer-dialog.component.html',
  styleUrls: ['./dealer-dialog.component.scss'],
})
export class DealerDialogComponent implements OnInit {
  action: boolean;

  localData: any;
  dealer: DealerItem;
  dealers: DealerItem[];

  showError = false;

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
      newRecord: true,
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
    if (this.dealers.find((elem) => elem.id === this.dealer.id.toUpperCase())) {
      this.showError = true;
    }
  }
}
