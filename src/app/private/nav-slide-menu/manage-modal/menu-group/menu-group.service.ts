import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FunctionSetting } from '../../../../shared/functionSetting';

@Injectable({
  providedIn: 'root'
})
export class MenuGroupService {
  constructor(
    private http: HttpClient,
    private functionSetting: FunctionSetting
  ) {
  }

  addUpdateMenu(data: object): Observable<any> {
    return this.http.post(this.functionSetting.API + 'menu/cu', data);
  }

  delMenu(menuId: Number): Observable<any> {
    return this.http.delete(this.functionSetting.API + 'menu/del/' + menuId);
  }
}
