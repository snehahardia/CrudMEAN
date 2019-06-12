import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private _http: Http) { }
  
  addClient(oClient) {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.post('http://localhost:3000/admin/clients/add', JSON.stringify(oClient), options).pipe(
            map((response: Response) => response.json()));
  }
  
  getClients() {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.get('http://localhost:3000/admin/clients', options).pipe(
            map((response: Response) => response.json()));
  }
  
  getClient(clientid) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(`http://localhost:3000/admin/clients/${clientid}`, options).pipe(
            map((response: Response) => response.json()));
    }
  
  editClient(clientId, oClient){
    let headers = new Headers ({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
      return this._http.put(`http://localhost:3000/admin/clients/edit/${clientId}`, JSON.stringify(oClient), options).pipe(
        map((response: Response) => response.json()));
  }
  
  deleteClient(clientId) {
  let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
      return this._http.delete(`http://localhost:3000/admin/clients/${clientId}`, options).pipe(
        map((response: Response) => response.json()));
  }
 
}
