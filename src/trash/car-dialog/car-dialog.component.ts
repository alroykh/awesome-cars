// import { CarsService } from './../../../main/cars/cars.service';
// import { Component, Inject, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CarItem, initCar } from '../car-item/car-item.interface';
// import { DealerItem } from '../dealer-item/dealer-item.interface';
// import { DealersService } from '../../../main/dealers/dealers.service';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Component({
//   selector: 'app-car-dialog',
//   templateUrl: './car-dialog.component.html',
//   styleUrls: ['./car-dialog.component.scss'],
// })
// export class CarDialogComponent implements OnInit {
//   cars: Array<CarItem>;
//   car: CarItem;
//   dealers: Array<DealerItem>;
//   dealer: DealerItem;
//   action: boolean;
//   localData: any;
//   myForm: FormGroup;
//   fileName: '';

//   selectedValue: string;
//   showError: boolean = false;
//   dealerChange$: Observable<any>;

//   @Input() passedCar: CarItem = null;

//   // constructor(
//   //   public carService: CarsService,
//   //   private dialogRef: MatDialogRef<CarDialogComponent>,
//   //   @Inject(MAT_DIALOG_DATA) public data: any,
//   //   private formBuilder: FormBuilder,
//   //   public dealerService: DealersService
//   // ) {
//   //   dialogRef.disableClose = true;
//   // }

//   private data: CarItem;
//   private dialogRef = null;
//   constructor(
//     private injector: Injector,
//     public carService: CarsService,
//     private formBuilder: FormBuilder,
//     public dealerService: DealersService
//   ) {
//     this.dialogRef = this.injector.get(MatDialogRef, null);
//     this.data = this.injector.get(MAT_DIALOG_DATA, null);
//   }

//   ngOnInit(): void {
//     this.carService.getAllCars().subscribe(
//       (res) => {
//         this.cars = res;
//       },
//       (err) => console.log(err)
//     );

//     this.dealerService.getDealers().subscribe(
//       (res) => {
//         this.dealers = res;
//       },
//       (error) => console.log(error)
//     );

//     this.data
//       ? // tslint:disable-next-line:no-unused-expression
//         (this.car = { ...this.data }) && (this.action = true)
//       : (this.car = initCar());
//     // this.formBuild(this.passedCar);
//     this.formBuild(this.passedCar);
    

//     this.myForm.controls.dealer.valueChanges
//       .pipe(
//         tap((value) => {
//           this.showError =
//             value &&
//             this.dealers &&
//             !this.dealers.find(
//               (el) => el.name.toLowerCase() === value.toString().toLowerCase()
//             );
//         })
//       )
//       .subscribe();
//   }

 

//   // formBuild(): void {
//   //   this.myForm = this.formBuilder.group({
//   //     model: [null, [Validators.required]],
//   //     dealer: [null, [Validators.required]],
//   //     class: [null],
//   //     year: [null],
//   //     color: [ null],
//   //     wikilink: [ null,
//   //       [
//   //         Validators.pattern(
//   //           /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
//   //         ),
//   //       ],
//   //     ],
//   //     description: [ null],
//   //     image: [ null],
//   //   });
//   // }

  

//   formBuild(carData: CarItem): void {
//     this.myForm = this.formBuilder.group({
//       model: [carData && carData.model ? carData.model : null, [Validators.required]],
//       dealer: [carData && carData.dealerName ? carData.dealerName : null, [Validators.required]],
//       class: [carData && carData.class ? carData.class : null],
//       year: [carData && carData.year ? carData.year : null],
//       color: [carData && carData.color ? carData.color : null],
//       wikilink: [
//         carData && carData.wikilink ? carData.wikilink : null,
//         [
//           Validators.pattern(
//             /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
//           ),
//         ],
//       ],
//       description: [carData && carData.description ? carData.description : null],
//       image: [carData && carData.image ? carData.image : null],
//     });
//   }

//   closeDialog(): void {
//     this.dialogRef.close();
//   }

//   selectDealer(dealerOption: any): void {
//     //  console.log(dealer);
//     this.myForm.controls.dealer.setValue(dealerOption.option.value.name);
//   }

//   uniqueId(): any {
//     let result = '';
//     const symbols = '0123456789';
//     const maxPosition = symbols.length - 1;
//     for (let i = 0; i < 10; ++i) {
//       const position = Math.floor(Math.random() * maxPosition);
//       result = result + symbols.substring(position, position + 1);
//     }

//     const found = this.cars.some((el) => el.id === result);

//     result ? !found : this.uniqueId();
//     return result;
//   }

//   saveAction(): void {
//     const selectedDealer = this.dealers.find(
//       (el) => el.name.toLowerCase() === this.myForm.value.dealer.toLowerCase()
//     );

//     const updatedCar = {
//       ...this.myForm.value,
//       id: this.uniqueId(),
//       brand: selectedDealer.id,
//       newItem: this.action ? true : false,
//       registrationDate: this.action ? this.car.registrationDate : new Date(),
//     };
//     this.dialogRef.close({
//       event: 'close',
//       data: updatedCar,
//     });
//   }
// }
