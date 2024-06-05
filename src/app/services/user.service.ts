import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/users';
  constructor() { }


 signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);  // Adjust the endpoint according to your backend
  }
  signin(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
