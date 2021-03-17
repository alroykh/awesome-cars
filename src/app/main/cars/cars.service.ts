import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { CarItem } from 'src/app/shared/modules/car-item/car-item.interface';

export interface CarParams {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsUrl = 'api/cars'; // url to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string): void {
    console.log(message);
  }

  // public getCars(): Observable<CarItem[]> {  // getting cars from the server
  //   // const url = `${this.carsUrl}/${id}`;
  //   return this.http.get<CarItem[]>(this.carsUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched cars')),
  //       catchError(this.handleError<CarItem[]>('getCars', [])));
  // }

   public updateCar(car: CarItem): Observable<any> {
    console.log('car: ', car);
    return this.http.put(this.carsUrl, car, this.httpOptions).pipe(
      tap((_) => this.log(`update car id=${car.id}`)),
      catchError(this.handleError<any>('updateCar'))
    );
  }

  // public searchCars(term: string): Observable<CarItem[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty car array.
  //     return of([]);
  //   }

  //   // return this.http.get<CarItem[]>(`${this.carsUrl}/?brand=${term}&model=${term}`).pipe(
  //   // let params = new HttpParams();
  //   // params = params.append('brand', term);
  //   // params = params.append('model', term);
  //   // return this.http.get<CarItem[]>(`${this.carsUrl}`, {params}).pipe(

  //   return this.http.get<CarItem[]>(`${this.carsUrl}/?brand=${term}`).pipe(
  //     tap((x) =>
  //       x.length
  //         ? this.log(`cars matching "${term}"`)
  //         : this.log(`no cars matching "${term}"`)
  //     ),
  //     catchError(this.handleError<CarItem[]>(`searchCars`, []))
  //   );
  // }

  public getCarsByParams(queryParams: CarParams = null): Observable<CarItem[]> {
    let params = new HttpParams();

    if (queryParams) {
      Object.keys(queryParams).forEach((key: string) => {
        params = params.append(key, queryParams[key]);
      });
    }

    return this.http.get<CarItem[]>(`${this.carsUrl}`, {params}).pipe(
      catchError(this.handleError<CarItem[]>(`Get cars by parameters`, []))
    );
  }

  // public getFavoriteCars(): Observable<CarItem[]> {
  //   return this.http.get<CarItem[]>(`${this.carsUrl}/?liked=true`).pipe(
  //     catchError(this.handleError<CarItem[]>(`searchCars`, []))
  //   );
  // }
}
