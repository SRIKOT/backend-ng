import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../../shared/auth.service';

import { FunctionSetting } from '../../../shared/functionSetting';

@Injectable({
  providedIn: 'root'
})
export class MenuManageModalService {

  private manageData = new BehaviorSubject([]);
  currentDataMenu = this.manageData.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private functionSetting: FunctionSetting
  ) {
  }

  newDataMenu(menu) {
    this.manageData.next(menu);
  }

  addUpdateMenu(data: object): Observable<any> {
    return this.http.post(this.functionSetting.API + 'menu/cu', data);
  }

  delMenu(menuId: Number): Observable<any> {
    return this.http.delete(this.functionSetting.API + 'menu/del/' + menuId);
  }
}
