import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private _http: Http) { }
  
  addDriver(oDriver) {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.post('http://localhost:3000/admin/drivers/add', JSON.stringify(oDriver), options).pipe(
            map((response: Response) => response.json()));
  }
  
  getDrivers() {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.get('http://localhost:3000/admin/drivers', options).pipe(
            map((response: Response) => response.json()));
  }
  
  getDriver(driverid) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(`http://localhost:3000/admin/drivers/${driverid}`, options).pipe(
            map((response: Response) => response.json()));
    }
  
  editDriver(driverId, oDriver){
    let headers = new Headers ({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
      return this._http.put(`http://localhost:3000/admin/drivers/edit/${driverId}`, JSON.stringify(oDriver), options).pipe(
        map((response: Response) => response.json()));
  }
  
  deleteDriver(driverId) {
  let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
      return this._http.delete(`http://localhost:3000/admin/drivers/${driverId}`, options).pipe(
        map((response: Response) => response.json()));
  }
  
}
