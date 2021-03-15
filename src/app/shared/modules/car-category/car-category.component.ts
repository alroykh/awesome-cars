import { Component, OnInit } from '@angular/core';

import { CarItem } from '../car-item/car-item.interface';
import { CARS } from '../../../../assets/data/data.constants';



@Component({
  selector: 'app-car-category',
  templateUrl: './car-category.component.html',
  styleUrls: ['./car-category.component.scss']
})
export class CarCategoryComponent implements OnInit {

  cars: CarItem[] = CARS;
  type = {category: 'coupe'};

  // filter(cars: CarItem[]): CarItem[] {
  //   let result: CarItem[] = [];
  //   // tslint:disable-next-line:forin
  //   for (const car in cars) {
  //       result.push(car);
  //       }
  //   return result;
  // }


  // getBookByTitle(title: string): IBook {
  //   const books = this._books;

  //   const bookByTitle: IBook[] = books.filter((book: IBook) => {
  //     return book.title === title;
  //   });

  //   return bookByTitle[0];
  // }


  constructor() { }

  ngOnInit(): void {
  }

}
