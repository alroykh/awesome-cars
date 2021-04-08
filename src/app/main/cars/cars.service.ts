import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { CarItem } from 'src/app/shared/modules/car-item/car-item.interface';
import { DealersService } from '../dealers/dealers.service';
import { DealerItem } from 'src/app/shared/modules/dealer-item/dealer-item.interface';

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

  private carsUrl = 'api/cars'; 
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public constructor(
    private http: HttpClient,
    private dealersService: DealersService
  ) {}

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {}

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
        switchMap((cars: CarItem[]) => this.getCarsWithMarka(cars)),
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
      switchMap((cars: CarItem[]) => this.getCarsWithMarka(cars)),
      map((res: CarItem[]) => this.getTrimmedCars(res, page, size))
    );
  }

  getAllCars(): Observable<CarItem[]> {
    return this.http.get<CarItem[]>(this.carsUrl).pipe(
      switchMap((cars: CarItem[]) => this.getCarsWithMarka(cars)),
      catchError(this.handleError<CarItem[]>('getCars', []))
    );
  }

  public getCars(page: number, size: number = 8): Observable<any> {
    return this.http.get<CarItem[]>(this.carsUrl).pipe(
      catchError(this.handleError<CarItem[]>('getCars', [])),
      switchMap((cars: CarItem[]) => this.getCarsWithMarka(cars)),
      map((res: CarItem[]) => this.getTrimmedCars(res, page, size))
    );
  }

  public getCategorizedCars(): Observable<CarItem[]> {
    return this.http.get<CarItem[]>(this.carsUrl).pipe(
      switchMap((cars: CarItem[]) => this.getCarsWithMarka(cars)),
      catchError(this.handleError<CarItem[]>('getCars', []))
    );
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

    return this.http.get<CarItem>(url).pipe(
      tap((_) => this.log(`fetched car id=${id}`)),
      switchMap((car: CarItem) => this.getCarsWithMarka([car])),
      map((res: CarItem[]) => res[0]),
      catchError(this.handleError<CarItem>(`getCat id = ${id}`))
    );
  }

  deleteCar(car: CarItem): Observable<CarItem> {
    const url = `${this.carsUrl}/${car.id}`;

    return this.http.delete<CarItem>(url, this.httpOptions).pipe(
      switchMap(() => this.dealersService.getDealerById(car.brand)),
      switchMap((dealer: DealerItem) =>
        this.dealersService.updateDealer({
          ...dealer,
          amountOfCars: dealer.amountOfCars - 1,
        })
      ),
      catchError(this.handleError<CarItem>('deleteCar'))
    );
  }

  addCar(car: CarItem): Observable<void> {
    return this.http.post<CarItem>(this.carsUrl, car, this.httpOptions).pipe(
      switchMap(() => this.dealersService.getDealerById(car.brand)),
      switchMap((dealer: DealerItem) =>
        this.dealersService.updateDealer({
          ...dealer,
          amountOfCars: dealer.amountOfCars + 1,
        })
      ),
      catchError(this.handleError<CarItem>('addCar'))
    );
  }

  getCarsWithMarka(cars: CarItem[]): Observable<CarItem[]> {
    return this.dealersService.getDealers().pipe(
      map((dealers: DealerItem[]) => {
        const dealersMap: Map<string, DealerItem> = new Map();
        dealers.forEach((dealer: DealerItem) =>
          dealersMap.set(dealer.id, dealer)
        );
        return dealersMap;
      }),
      map((res: Map<string, DealerItem>) => {
        return cars.map((car) => {
          return {
            ...car,
            dealerName: res.get(car.brand)
              ? res.get(car.brand).name
              : car.brand,
          };
        });
      }),
      catchError((err) => of([]))
    );
  }
}
