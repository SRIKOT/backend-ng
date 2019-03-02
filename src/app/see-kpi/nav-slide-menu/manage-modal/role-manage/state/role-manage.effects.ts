import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { RoleManageService } from '../role-manage.service';
import * as roleActions from './role-manage.actions';
import { Role } from '../role.model';

@Injectable()
export class RoleEffect {
  constructor(
    private actions$: Actions,
    private roleService: RoleManageService
  ) { }

  @Effect()
  loadRoles$: Observable<Action> = this.actions$.pipe(ofType<roleActions.LoadRoles>(
    roleActions.RoleActionTypes.LOAD_ROLES
  ),
    mergeMap((action: roleActions.LoadRoles) =>
      this.roleService.listRolesState().pipe(
        map(
          (roles: Role[]) =>
            new roleActions.LoadRolesSuccess(roles)
        ),
        catchError(err => of(new roleActions.LoadRolesFail(err)))
      )
    )
  );

  @Effect()
  loadRole$: Observable<Action> = this.actions$.pipe(ofType<roleActions.LoadRole>(
    roleActions.RoleActionTypes.LOAD_ROLE
  ),
    mergeMap((action: roleActions.LoadRole) =>
      this.roleService.getRoleState(action.payload).pipe(
        map(
          (role: Role) =>
            new roleActions.LoadRoleSuccess(role)
        ),
        catchError(err => of(new roleActions.LoadRoleFail(err)))
      )
    )
  );

  @Effect()
  createRole$: Observable<Action> = this.actions$.pipe(ofType<roleActions.CreateRole>(
    roleActions.RoleActionTypes.CREATE_ROLE
  ),
    map((action: roleActions.CreateRole) =>
      new roleActions.CreateRoleSuccess(action.payload)
    )
  );

  @Effect()
  updateRole$: Observable<Action> = this.actions$.pipe(ofType<roleActions.UpdateRole>(
    roleActions.RoleActionTypes.UPDATE_ROLE
  ),
    map((action: roleActions.UpdateRole) =>
      new roleActions.UpdateRoleSuccess({
        id: action.payload.id,
        changes: action.payload
      })
    )
  );

  // @Effect()
  // createRole$: Observable<Action> = this.actions$.pipe(ofType<roleActions.CreateRole>(
  //   roleActions.RoleActionTypes.CREATE_ROLE
  // ),
  //   map((action: roleActions.CreateRole) => action.payload),
  //   mergeMap((role: Role) =>
  //     this.roleService.createRoleState(role).pipe(
  //       map(
  //         (newRole: Role) =>
  //           new roleActions.CreateRoleSuccess(newRole)
  //       ),
  //       catchError(err => of(new roleActions.CreateRoleFail(err)))
  //     )
  //   )
  // );

  // @Effect()
  // updateRole$: Observable<Action> = this.actions$.pipe(ofType<roleActions.UpdateRole>(
  //   roleActions.RoleActionTypes.UPDATE_ROLE
  // ),
  //   map((action: roleActions.UpdateRole) => action.payload),
  //   mergeMap((role: Role) =>
  //     this.roleService.updateRoleState(role)
  //       .pipe(
  //         map((updateRole: Role) =>
  //           new roleActions.UpdateRoleSuccess({
  //             id: updateRole.id,
  //             changes: updateRole
  //           })
  //         ),
  //         catchError(err => of(new roleActions.UpdateRoleFail(err)))
  //       )
  //   )
  // );

  @Effect()
  deleteRole$: Observable<Action> = this.actions$.pipe(ofType<roleActions.DeleteRole>(
    roleActions.RoleActionTypes.DELETE_ROLE
  ),
    map((action: roleActions.DeleteRole) => action.payload),
    mergeMap((id: number) =>
      this.roleService.deleteRole(id).pipe(
        map(() => new roleActions.DeleteRoleSuccess(id)),
        catchError(err => of(new roleActions.DeleteRoleFail(err)))
      )
    )
  );
}
