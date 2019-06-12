import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private _http: Http) { }
  
    addCar(oCar) {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.post('http://localhost:3000/admin/cars/add', JSON.stringify(oCar), options).pipe(
            map((response: Response) => response.json()));
  }
  
  getCars() {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.get('http://localhost:3000/admin/cars', options).pipe(
            map((response: Response) => response.json()));
  }
  
  getCar(carid) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(`http://localhost:3000/admin/cars/${carid}`, options).pipe(
            map((response: Response) => response.json()));
    }
  
  editCar(carId, oCar){
    let headers = new Headers ({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
      return this._http.put(`http://localhost:3000/admin/cars/edit/${carId}`, JSON.stringify(oCar), options).pipe(
        map((response: Response) => response.json()));
  }
  
  deleteCar(carId) {
  let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(`http://localhost:3000/admin/cars/${carId}`, options).pipe(
        map((response: Response) => response.json()));
  }
}
