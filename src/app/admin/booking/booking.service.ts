import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http: Http) { }
  
    addBooking(oBooking) {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.post('http://localhost:3000/admin/booking/add', JSON.stringify(oBooking), options).pipe(
            map((response: Response) => response.json()));
  }
  
  getBookings() {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.get('http://localhost:3000/admin/booking', options).pipe(
            map((response: Response) => response.json()));
  }
  
    getBooking(bookingid) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(`http://localhost:3000/admin/booking/${bookingid}`, options).pipe(
            map((response: Response) => response.json()));
    }
  
  editBooking(bookingId, oBooking){
    let headers = new Headers ({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
      return this._http.put(`http://localhost:3000/admin/booking/edit/${bookingId}`, JSON.stringify(oBooking), options).pipe(
        map((response: Response) => response.json()));
    
  }
  
  deleteBooking(bookingId) {
  let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
      return this._http.delete(`http://localhost:3000/admin/booking/${bookingId}`, options).pipe(
        map((response: Response) => response.json()));
  }
 
}
