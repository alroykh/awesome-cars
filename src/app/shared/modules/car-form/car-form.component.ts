import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, debounceTime, takeWhile } from 'rxjs/operators';
import { DealersService } from 'src/app/main/dealers/dealers.service';
import { CarItem } from '../car-item/car-item.interface';
import { DealerItem } from '../dealer-item/dealer-item.interface';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent implements OnInit, OnDestroy {
  @Input() passedCar: CarItem = null;
  @Output()
  saveCarData: EventEmitter<CarItem> = new EventEmitter<CarItem>();
  @Output() cancelCar: EventEmitter<any> = new EventEmitter();
  myForm: FormGroup;
  showError = false;
  dealers: DealerItem[] = [];
  dealers$: Observable<DealerItem[]>;
  isSaving = false;
  isAlive = true;

  constructor(
    private formBuilder: FormBuilder,
    private dealerService: DealersService
  ) {}

  ngOnInit(): void {
    this.getDealers();

    this.formBuild(this.passedCar);

    this.myForm.controls.dealer.valueChanges
      .pipe(
        takeWhile(() => this.isAlive),
        debounceTime(400),
        tap((value) => {
          this.showError =
            value &&
            this.dealers &&
            !this.dealers.find(
              (el) => el.name.toLowerCase() === value.toString().toLowerCase()
            );
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
    this.dealers$ = this.dealerService.getDealers().pipe(
      tap((dealers: DealerItem[]) => {
        this.dealers = dealers;
      })
    );
  }

  public saveAction(): void {
    this.isSaving = true;
    const selectedDealer = this.dealers.find(
      (el) =>
        el.name.toLowerCase() === (this.myForm.value.dealer || '').toLowerCase()
    );
    const updatedCar = {
      ...this.myForm.getRawValue(),
      brand: selectedDealer ? selectedDealer.id : null,
      id: this.passedCar ? this.passedCar.id : null,
      newItem: this.passedCar ? this.passedCar.newItem : true,
      registrationDate: this.passedCar
        ? this.passedCar.registrationDate
        : new Date(),
    };

    this.saveCarData.emit(updatedCar);
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
