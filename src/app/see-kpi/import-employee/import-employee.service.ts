import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../../shared/auth.service';

import { Level } from '../_model/appraisal_level.model';
import { Org } from '../_model/org.model';
import { Employee } from '../_model/employee.model';

import { ajax } from 'rxjs/observable/dom/ajax';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportEmployeeService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  // list_org(): Observable<Org[]> {
  //   return this.http.get<Org[]>(this.authService.API + 'org');
  // }

  // list_level(): Observable<Level[]> {
  //   return this.http.get<Level[]>(this.authService.API + 'employee_snap/list_level');
  // }

  // auto_employee(codeOrName: string) {
  //   return this.http.post(this.authService.API + 'employee_snap/auto_emp', {'emp_name': codeOrName});
  // }

  // auto_employee(codeOrName: string): Observable<Employee[]> {
  //   return this.http.post<Employee[]>(this.authService.API + 'employee_snap/auto_emp', { "emp_name": codeOrName });
  // }

  // get_employee() {
  //   const req = new HttpRequest('GET', this.authService.API + 'employee', {
  //     reportProgress: true
  //   });

  //   this.http.request(req).subscribe(
  //     (event: HttpEvent<any>) => {
  //       switch (event.type) {
  //         case HttpEventType.Sent:
  //           //console.log('Request sent!');
  //           this.loadingService.loadingStatus(true);
  //           break;
  //         case HttpEventType.ResponseHeader:
  //           //console.log('Response header received!');
  //           break;
  //         case HttpEventType.UploadProgress:
  //           const percentDone = Math.round(100 * event.loaded / event.total);
  //           //console.log(`File is ${percentDone}% uploaded.`);
  //         case HttpEventType.DownloadProgress:
  //           const kbLoaded = Math.round(event.loaded / 1024);
  //           console.log(`Download in progress! ${kbLoaded}Kb loaded`);
  //           break;
  //         case HttpEventType.Response:
  //           console.log('😺 Done!', event.body);
  //           this.loadingService.loadingStatus(false);
  //       }
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         console.log("Client-side error occured.");
  //       } else {
  //         console.log("Server-side error occured.");
  //       }
  //     }
  //   );
  // }
}

