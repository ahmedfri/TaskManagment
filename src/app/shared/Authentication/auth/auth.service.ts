import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://ahmedosm-001-site1.dtempurl.com/api/ApplicationUser/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedInn() {
    return this.loggedIn.asObservable(); // {2}
  }
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/auth/login`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        if (res.usertype == 1) {
        this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/employee']);
        }
        this.currentUser = res;
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/aut/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  getCurrentUser() {
    const helper = new JwtHelperService();
    
    let authToken = localStorage.getItem('access_token')!;
    const decodedToken = helper.decodeToken(authToken);

    return decodedToken;
  }
}