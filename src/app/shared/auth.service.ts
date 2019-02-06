import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { FunctionSetting } from './functionSetting';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(
    private http: HttpClient,
    private functionSetting: FunctionSetting
  ) { }

  authentication(email, password) {
    return this.http.post(this.functionSetting.API + 'session', { 'email': email, 'password': password })
      .pipe(map(res => {
        if (res['token']) {
          localStorage.setItem('token', res['token']);
          this.isLoginSubject.next(true);
          return true;
        } else {
          return false;
        }
      }));
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }

  /**
 * if we have token the user is loggedIn
 * @returns {boolean}
 */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
