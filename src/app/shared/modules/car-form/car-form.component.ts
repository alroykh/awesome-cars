import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, debounceTime } from 'rxjs/operators';
import { DealersService } from 'src/app/main/dealers/dealers.service';
import { CarItem } from '../car-item/car-item.interface';
import { DealerItem } from '../dealer-item/dealer-item.interface';

export interface FormDataOutput {
  isFormValid: boolean;
  data: CarItem;
}

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent implements OnInit {
  @Input() passedCar: CarItem = null;
  @Output() formData: EventEmitter<FormDataOutput> = new EventEmitter<FormDataOutput>();
  myForm: FormGroup;
  showError = false;
  dealers: DealerItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dealerService: DealersService
  ) {}

  ngOnInit(): void {
    this.getDealers();
    this.formBuild(this.passedCar);

    this.myForm.controls.dealer.valueChanges
      .pipe(
        debounceTime(400),
        tap((value) => {
          this.showError =
            value &&
            this.dealers &&
            !this.dealers.find(
              (el) => el.name.toLowerCase() === value.toString().toLowerCase()
            );
          console.log(value);
        })
      )
      .subscribe();

    this.myForm.valueChanges
      .pipe(
        debounceTime(400),
        tap(() => {
          this.emitFormData();
        })
      )
      .subscribe();
  }

  formBuild(carData: CarItem): void {
    this.myForm = this.formBuilder.group({
      model: [
        carData && carData.model ? carData.model : null,
        [Validators.required],
      ],
      dealer: [
        carData && carData.dealerName ? carData.dealerName : null,
        [Validators.required],
      ],
      class: [carData && carData.class ? carData.class : null],
      year: [carData && carData.year ? carData.year : null],
      color: [carData && carData.color ? carData.color : null],
      wikilink: [
        carData && carData.wikilink ? carData.wikilink : null,
        [
          Validators.pattern(
            /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
          ),
        ],
      ],
      description: [
        carData && carData.description ? carData.description : null,
      ],
      image: [carData && carData.image ? carData.image : null],
    });
  }

  selectDealer(dealerOption: any): void {
    this.myForm.controls.dealer.setValue(dealerOption.option.value.name);
  }

  private getDealers(): void {
    this.dealerService.getDealers().subscribe(
      (res) => {
        this.dealers = res;
        console.log('Dealers:', this.dealers);
      },
      (error) => console.log(error)
    );
  }

  private emitFormData(): void {
    const selectedDealer = this.dealers.find(
      (el) => el.name.toLowerCase() === (this.myForm.value.dealer || '').toLowerCase()
    );

    this.formData.emit({
      isFormValid: this.myForm.valid,
      data: { 
        ...this.myForm.getRawValue(),
        brand: selectedDealer ? selectedDealer.id : null,
        id: this.passedCar ? this.passedCar.id : null,
        newItem: this.passedCar ? !!this.passedCar : null,
        registrationDate: this.passedCar ? this.passedCar.registrationDate : new Date(),
        },
    });
  }
}
