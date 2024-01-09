import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  API_URL: string = 'http://restapi.adequateshop.com/api/authaccount/login';
  constructor(private http: HttpClient) {}

  doLogin(): Observable<any> {
    // let contentHeaders = new HttpHeaders();
    // contentHeaders.append('Content-Type', 'application/json');
    // return this.http.post(
    //   this.API_URL,
    //   JSON.stringify({
    //     email: 'Developer5@gmail.com',
    //     password: 123456,
    //     // expiresInMins: 60, // optional
    //   }),
    //   { headers: contentHeaders }
    // );

    return this.http.get<any>('http://localhost:3000/signupUsersList');
    // .subscribe((resp) => {
    //   console.log(resp);
    // });
  }
}
