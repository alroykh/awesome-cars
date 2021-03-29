import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { DealerItem } from 'src/app/shared/modules/dealer-item/dealer-item.interface';

@Injectable({
  providedIn: 'root',
})
export class DealersService {
  private dealersUrl = 'api/dealers'; // url to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    console.log(message);
  }

  getDealers(): Observable<DealerItem[]> {
    return this.http
      .get<DealerItem[]>(this.dealersUrl)
      .pipe(catchError(this.handleError<DealerItem[]>('getDealers', [])));
  }

  addDealer(dealer: DealerItem): Observable<DealerItem> {
    return this.http
      .post<DealerItem>(this.dealersUrl, dealer, this.httpOptions)
      .pipe(catchError(this.handleError<DealerItem>('addDealer')));
  }

  updateDealer(dealer: DealerItem): Observable<any> {
    return this.http
      .put(this.dealersUrl, dealer, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateDealer')));
  }

  /** DELETE: delete the dealer from the server */
  deleteDealer(dealer: DealerItem | string): Observable<DealerItem> {
    const id: string = typeof dealer === 'string' ? dealer : dealer.id;
    const url: string = `${this.dealersUrl}/${id}`;

    return this.http
      .delete<DealerItem>(url, this.httpOptions)
      .pipe(catchError(this.handleError<DealerItem>('deleteDealer')));
  }
}
