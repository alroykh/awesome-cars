// import { Component, Inject, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   FormControl,
// } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { CarsService } from 'src/app/main/cars/cars.service';
// import { DealersService } from 'src/app/main/dealers/dealers.service';
// import { CarItem, initCar } from '../car-item/car-item.interface';
// import { DealerItem } from '../dealer-item/dealer-item.interface';

// @Component({
//   selector: 'app-car-edit',
//   templateUrl: './car-edit.component.html',
//   styleUrls: ['./car-edit.component.scss'],
// })
// export class CarEditComponent implements OnInit {
//   cars: Array<CarItem>;
//   car: CarItem;
//   dealers: Array<DealerItem>;
//   dealer: DealerItem;
//   action: boolean;
//   localData: any;
//   myForm: FormGroup;
//   form: FormGroup;

//   selectedValue: string;
//   showError: boolean = false;
//   dealerChange$: Observable<any>;

//   constructor(
//     public carService: CarsService,
//     // private dialogRef: MatDialogRef<CarEditComponent>,
//     // @Inject(MAT_DIALOG_DATA) public data: any,
//     private formBuilder: FormBuilder,
//     public dealerService: DealersService
//   ) {}

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
//         console.log('Dealers:', this.dealers);
//       },
//       (error) => console.log(error)
//     );

//     this.formBuild();

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

//   formBuild(): void {
//     this.myForm = this.formBuilder.group({
//       model: [null, [Validators.required]],
//       dealer: [null, [Validators.required]],
//       class: [null],
//       year: [null],
//       color: [null],
//       wikilink: [
//         null,
//         [
//           Validators.pattern(
//             /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
//           ),
//         ],
//       ],
//       description: [null],
//       image: [null],
//     });

//     // this.form = new FormGroup({
//     //   model: new FormControl(this.car.model, Validators.required),
//     //   dealer: new FormControl(this.car.brand, Validators.required),
//     //   class: new FormControl(this.car.class),
//     //   year: new FormControl(this.car.year),
//     //   color: new FormControl(this.car.color),
//     //   wikilink: new FormControl(
//     //     this.car.wikilink,
//     //     Validators.pattern(
//     //       /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
//     //     )
//     //   ),
//     //   description: new FormControl(this.car.description),
//     //   image: new FormControl(this.car.image),
//     // });
//   }

//   selectDealer(dealerOption: any): void {}

//   uploadFileEvt($event) {}

//   saveAction() {}
//   closeDialog() {}
// }
