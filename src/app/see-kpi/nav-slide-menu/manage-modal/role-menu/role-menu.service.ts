import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FunctionSetting } from '../../../../shared/functionSetting';

import { Role } from '../role-manage/role.model';


@Injectable({
  providedIn: 'root'
})
export class RoleMenuService {
  constructor(
    private http: HttpClient,
    private functionSetting: FunctionSetting
  ) {
  }

  listRoleMenu() {
    return this.http.get(this.functionSetting.API + 'role/listRoleMenu');
  }

  // getRoleState(id: number): Observable<Role> {
  //   return this.http.get<Role>(this.functionSetting.API + 'role/getRole/' + id);
  // }
  // updateRole(row: Role): Observable<Role> {
  //   return this.http.post<Role>(this.functionSetting.API + 'role/addEditRole', row);
  // }

  // deleteRole(id: number) {
  //   return this.http.delete<Role>(this.functionSetting.API + 'role/deleteRole/' + id);
  // }
}
