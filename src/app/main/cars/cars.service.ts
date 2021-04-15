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
    let carBeforeUpdate: CarItem;

    return this.getCarById(car.id).pipe(
      tap((currentCar: CarItem) => {
        carBeforeUpdate = currentCar;
      }),
      switchMap(() => this.http.put(this.carsUrl, car, this.httpOptions)),
      switchMap(() => {
        if (carBeforeUpdate.brand === car.brand) {
          return of(null);
        }

        return forkJoin([
          this.dealersService.updateDealerCarsAmount(car.brand, true),
          this.dealersService.updateDealerCarsAmount(carBeforeUpdate.brand, false),
        ]);
      }),
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
        switchMap((cars: CarItem[]) => this.getCarsWithDealerName(cars)),
        catchError(this.handleError<CarItem[]>(`Get cars by parameters`, []))
      );
  }


  getAllCars(): Observable<CarItem[]> {
    return this.http.get<CarItem[]>(this.carsUrl).pipe(
      switchMap((cars: CarItem[]) => this.getCarsWithDealerName(cars)),
      catchError(this.handleError<CarItem[]>('getCars', []))
    );
  }

 

  public getCategorizedCars(): Observable<CarItem[]> {
    return this.http.get<CarItem[]>(this.carsUrl).pipe(
      switchMap((cars: CarItem[]) => this.getCarsWithDealerName(cars)),
      catchError(this.handleError<CarItem[]>('getCars', []))
    );
  }


  getCarById(id: string): Observable<CarItem> {
    const url = `${this.carsUrl}/${id}`;

    return this.http.get<CarItem>(url).pipe(
      tap((_) => this.log(`fetched car id=${id}`)),
      switchMap((car: CarItem) => this.getCarsWithDealerName([car])),
      map((res: CarItem[]) => res[0]),
      catchError(this.handleError<CarItem>(`getCat id = ${id}`))
    );
  }

  deleteCar(car: CarItem): Observable<CarItem> {
    const url = `${this.carsUrl}/${car.id}`;

    return this.http.delete<CarItem>(url, this.httpOptions).pipe(
      switchMap(() => this.dealersService.updateDealerCarsAmount(car.brand, false)),
      catchError(this.handleError<CarItem>('deleteCar'))
    );
  }

  addCar(car: CarItem): Observable<void> {
    return this.http.post<CarItem>(this.carsUrl, car, this.httpOptions).pipe(
      switchMap(() => this.dealersService.updateDealerCarsAmount(car.brand, true)),
      catchError(this.handleError<CarItem>('addCar'))
    );
  }

  getCarsWithDealerName(cars: CarItem[]): Observable<CarItem[]> {
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
