import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { CarItem } from 'src/app/shared/modules/car-item/car-item.interface';

export interface CarParams {
  [key: string]: any;
}

export interface CarsTrimmed {
  list: CarItem[];
  isLastPage: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  cars: CarItem[] = new Array<CarItem>();

  private carsUrl = 'api/cars'; // url to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string): void {
    console.log(message);
  }

  public updateCar(car: CarItem): Observable<any> {
    return this.http.put(this.carsUrl, car, this.httpOptions).pipe(
      tap((_) => this.log(`update car id=${car.id}`)),
      catchError(this.handleError<any>('updateCar'))
    );
  }

  public getCarsByParams(queryParams: CarParams = null): Observable<CarItem[]> {
    let params = new HttpParams();

    if (queryParams) {
      Object.keys(queryParams).forEach((key: string) => {
        params = params.append(key, queryParams[key]);
      });
    }

    return this.http
      .get<CarItem[]>(`${this.carsUrl}`, { params })
      .pipe(
        catchError(this.handleError<CarItem[]>(`Get cars by parameters`, []))
      );
  }

  public getFilteredCars(
    value: string | number,
    page: number,
    size: number = 8
  ): Observable<any> {
    return forkJoin([
      this.getCarsByParams({ model: value }),
      this.getCarsByParams({ brand: value }),
    ]).pipe(
      map(([carsByModel, carsByBrand]: Array<CarItem[]>) => {
        const uniqueCars = [];
        const unitedArray: CarItem[] = [...carsByModel, ...carsByBrand];
        const uniqueCarsMap = new Map<string, CarItem>();

        unitedArray.forEach((item: CarItem) => {
          uniqueCarsMap.set(item.id, item);
        });

        for (const val of uniqueCarsMap.values()) {
          uniqueCars.push(val);
        }
        return uniqueCars;
      }),
      map((res: CarItem[]) => this.getTrimmedCars(res, page, size))
    );
  }

  getAllCars(): Observable<CarItem[]> {
    return this.http
      .get<CarItem[]>(this.carsUrl)
      .pipe(catchError(this.handleError<CarItem[]>('getCars', [])));
  }

  public getCars(page: number, size: number = 8): Observable<any> {
    return this.http.get<CarItem[]>(this.carsUrl).pipe(
      catchError(this.handleError<CarItem[]>('getCars', [])),
      map((res: CarItem[]) => this.getTrimmedCars(res, page, size))
    );
  }

  public getCategorizedCars(): Observable<CarItem[]> {
    return this.http
      .get<CarItem[]>(this.carsUrl)
      .pipe(catchError(this.handleError<CarItem[]>('getCars', [])));
  }

  private getTrimmedCars(
    carList: CarItem[],
    page: number,
    size: number = 8
  ): CarsTrimmed {
    const startIndex = page === 1 ? 0 : (page - 1) * size;
    const endIndex = startIndex + size;
    const carsTrimmed = {
      list: carList.slice(startIndex, startIndex + size),
      isLastPage: carList.length - 1 <= endIndex,
    };
    return carsTrimmed;
  }

  getCarById(id: string): Observable<CarItem> {
    const url = `${this.carsUrl}/${id}`;

    return this.http.get<CarItem>(url)
      .pipe(
          tap((_) => this.log(`fetched car id=${id}`)),
    catchError(this.handleError<CarItem>(`getCat id = ${id}`)));
  }

  deleteCar(car: CarItem | string): Observable<CarItem> {
    const id: string = typeof car === 'string' ? car : car.id;
    const url: string = `${this.carsUrl}/${id}`;

    return this.http
      .delete<CarItem>(url, this.httpOptions)
      .pipe(catchError(this.handleError<CarItem>('deleteCar')));
  }

  addCar(dealer: CarItem): Observable<CarItem> {
    return this.http
      .post<CarItem>(this.carsUrl, dealer, this.httpOptions)
      .pipe(catchError(this.handleError<CarItem>('addDealer')));
  }
}
