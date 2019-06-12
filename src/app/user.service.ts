import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: Http) { }
  
  
  addUser(oUser) {
        let headers = new Headers ({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this._http.post('http://localhost:3000/signup', JSON.stringify(oUser), options).pipe(
            map((response: Response) => response.json()));
  }
  
}
