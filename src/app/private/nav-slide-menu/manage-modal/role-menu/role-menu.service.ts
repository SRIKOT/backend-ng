import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FunctionSetting } from '../../../../shared/functionSetting';

import { RoleMenu, Role } from './role-menu.model';


@Injectable({
  providedIn: 'root'
})
export class RoleMenuService {
  constructor(
    private http: HttpClient,
    private functionSetting: FunctionSetting
  ) {
  }

  listRoleMenu(): Observable<RoleMenu[]> {
    return this.http.get<RoleMenu[]>(this.functionSetting.API + 'role/listRoleMenu');
  }

  updateRoleMenu(roleMenu: Role) {
    return this.http.patch(this.functionSetting.API + 'role/updateRoleMenu', roleMenu);
  }
}
