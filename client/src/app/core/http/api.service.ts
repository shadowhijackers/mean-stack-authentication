import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  private errorHandler(operationName: string, defaultData): (e) => Observable<any> {
    return (error: HttpErrorResponse) => {
      const errorMessage = (error.error instanceof ErrorEvent) ?
        error.error.message : `server returned code ${error.status} with body ${error.error}`;
      return of({errors: errorMessage, data: defaultData});
    };
  }

  login(payload){
    return this.http.post(`${environment.url}/login`, payload)
      .pipe(catchError(this.errorHandler('Login', null)));
  }

  register(payload){
    return this.http.post(`${environment.url}/register`, payload)
      .pipe(catchError(this.errorHandler('Register', null)));
  }

  getUsers(payload){
    return this.http.post(`${environment.url}/users`, payload)
      .pipe(catchError(this.errorHandler('Get Users', null)));
  }

}
