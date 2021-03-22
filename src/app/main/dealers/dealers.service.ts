import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { DealerItem } from 'src/app/shared/modules/dealer-item/dealer-item.interface';

export interface DealerParams {
  [key: string]: any;
}

@Injectable(
  {
  providedIn: 'root'}
  )
export class DealersService {
  private dealersUrl = 'api/dealers'; // url to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  allDealers: DealerItem[] = new Array<DealerItem>();

  constructor(private http: HttpClient) { }

  findDealerById(id: string): Observable<DealerItem> {
    return this.http.get<DealerItem>(`/api/courses/${id}`);
}

findAllDealers(): Observable<DealerItem[]> {
    return this.http.get('/api/dealers')
        .pipe(
            // tslint:disable-next-line:no-string-literal
            map(res => res['payload'])
        );
}

// findAllCourseLessons(courseId:number): Observable<DealerItem[]> {
//     return this.http.get('/api/lessons', {
//         params: new HttpParams()
//             .set('courseId', courseId.toString())
//             .set('pageNumber', "0")
//             .set('pageSize', "1000")
//     }).pipe(
//         map(res =>  res["payload"])
//     );
// }

  findDealers(
    name: string, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 10): Observable<DealerItem[]> {

    return this.http.get(this.dealersUrl, {
    // this.allDealers =  this.http.get(this.dealersUrl, {
        params: new HttpParams()
            // .set('name', name.toString())
            .set('name', name)
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
    }).pipe(
        // tslint:disable-next-line:no-string-literal
        map(res =>  res['payload'])
    );
    // return allDealers;
}

private log(message: string): void {
  console.log(message);
}

// tslint:disable-next-line:typedef
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);

    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}

public updateDealer(dealer: DealerItem): Observable<any> {
  console.log('dealer: ', dealer);
  return this.http.put(this.dealersUrl, dealer, this.httpOptions).pipe(
    tap((_) => this.log(`update dealer id=${dealer.name}`)),
    catchError(this.handleError<any>('updateDealer'))
  );
}
}
