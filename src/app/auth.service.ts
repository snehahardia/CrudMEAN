import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

public currentUser: IUser;

  constructor(private _http: Http) { }
  
   isLoggedIn(): boolean {
        try {
            const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
            if (theUser) {
                this.currentUser = theUser.user;
            }
        } catch (e) {
            return false;
        }

        return !!this.currentUser;
    }

    login(oUser) {
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
                            
      return this._http.post('http://localhost:3000/login', JSON.stringify(oUser), options).pipe(
        tap((response: Response) => {
            if (response.json().success) {
                this.currentUser = <IUser>response.json().message;
                let userObj: any = {};
                userObj.user = response.json().message;
                userObj.token = response.json().token;
                userObj.roles = response.json().roles;

                localStorage.setItem('currentUser', JSON.stringify(userObj));
            }
            response.json();
        }));
    }
    
    roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: any = JSON.parse(localStorage.getItem('currentUser'));
    if(userRoles){
    var roles = userRoles.roles;
      if (allowedRoles === roles) {
        isMatch = true;
      }

    }
    return isMatch;
  }
    
    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
}
