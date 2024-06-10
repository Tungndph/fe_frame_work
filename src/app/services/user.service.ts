import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { RegisterForm } from '../../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
<<<<<<< HEAD
  apiUrl = 'http://localhost:3000';
  apiUsers = 'http://localhost:3000/users';
  constructor() { }
  getUser() {
    return this.http.get<RegisterForm[]>(this.apiUsers);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUsers}/${id}`);
=======
  apiUrl = 'http://localhost:3000/auth';
  apiUsers = 'http://localhost:3000/users';
  constructor() { }
  getUser() {
    return this.http.get<RegisterForm[]>(this.apiUrl);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
>>>>>>> 5a559b7d1b635bef387d490a3d0c4e9f579af2dc
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);  // Adjust the endpoint according to your backend
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);  // Adjust the endpoint according to your backend
  }

  emailExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-email?email=${control.value}`).pipe(
        map(response => (response.exists ? { emailExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
