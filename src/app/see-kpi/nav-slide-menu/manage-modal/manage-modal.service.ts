import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FunctionSetting } from '../../../shared/functionSetting';

@Injectable({
  providedIn: 'root'
})
export class ManageModalService {

  private manageData = new BehaviorSubject([]);
  currentDataMenu = this.manageData.asObservable();

  constructor(
    private http: HttpClient,
    private functionSetting: FunctionSetting
  ) {
  }

  newDataMenu(menu) {
    this.manageData.next(menu);
  }

  sortMenu(data: Array<any>): Observable<any> {
    return this.http.patch(this.functionSetting.API + 'menu/sortMenu', data);
  }
}
