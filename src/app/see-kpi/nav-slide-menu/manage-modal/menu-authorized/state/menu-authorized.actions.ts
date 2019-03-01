import { Action } from "@ngrx/store";

import { Update } from "@ngrx/entity";

import { Role } from "../role.model";

export enum RoleActionTypes {
  LOAD_ROLES = "[Role] Load Roles",
  LOAD_ROLES_SUCCESS = "[Role] Load Roles Success",
  LOAD_ROLES_FAIL = "[Role] Load Roles Fail",
  LOAD_ROLE = "[Role] Load Role",
  LOAD_ROLE_SUCCESS = "[Role] Load Role Success",
  LOAD_ROLE_FAIL = "[Role] Load Role Fail",
  CREATE_ROLE = "[Role] Create Role",
  CREATE_ROLE_SUCCESS = "[Role] Create Role Success",
  CREATE_ROLE_FAIL = "[Role] Create Role Fail",
  UPDATE_ROLE = "[Role] Update Role",
  UPDATE_ROLE_SUCCESS = "[Role] Update Role Success",
  UPDATE_ROLE_FAIL = "[Role] Update Role Fail",
  DELETE_ROLE = "[Role] Delete Role",
  DELETE_ROLE_SUCCESS = "[Role] Delete Role Success",
  DELETE_ROLE_FAIL = "[Role] Delete Role Fail"
}

export class LoadRoles implements Action {
  readonly type = RoleActionTypes.LOAD_ROLES;
}

export class LoadRolesSuccess implements Action {
  readonly type = RoleActionTypes.LOAD_ROLES_SUCCESS;

  constructor(public payload: Role[]) {}
}

export class LoadRolesFail implements Action {
  readonly type = RoleActionTypes.LOAD_ROLES_FAIL;

  constructor(public payload: string) {}
}

export class LoadRole implements Action {
  readonly type = RoleActionTypes.LOAD_ROLE;

  constructor(public payload: number) {}
}

export class LoadRoleSuccess implements Action {
  readonly type = RoleActionTypes.LOAD_ROLE_SUCCESS;

  constructor(public payload: Role) {}
}

export class LoadRoleFail implements Action {
  readonly type = RoleActionTypes.LOAD_ROLE_FAIL;

  constructor(public payload: string) {}
}

export class CreateRole implements Action {
  readonly type = RoleActionTypes.CREATE_ROLE;

  constructor(public payload: Role) {}
}

export class CreateRoleSuccess implements Action {
  readonly type = RoleActionTypes.CREATE_ROLE_SUCCESS;

  constructor(public payload: Role) {}
}

export class CreateRoleFail implements Action {
  readonly type = RoleActionTypes.CREATE_ROLE_FAIL;

  constructor(public payload: string) {}
}

export class UpdateRole implements Action {
  readonly type = RoleActionTypes.UPDATE_ROLE;

  constructor(public payload: Role) {}
}

export class UpdateRoleSuccess implements Action {
  readonly type = RoleActionTypes.UPDATE_ROLE_SUCCESS;

  constructor(public payload: Update<Role>) {}
}

export class UpdateRoleFail implements Action {
  readonly type = RoleActionTypes.UPDATE_ROLE_FAIL;

  constructor(public payload: string) {}
}

export class DeleteRole implements Action {
  readonly type = RoleActionTypes.DELETE_ROLE;

  constructor(public payload: number) {}
}

export class DeleteRoleSuccess implements Action {
  readonly type = RoleActionTypes.DELETE_ROLE_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteRoleFail implements Action {
  readonly type = RoleActionTypes.DELETE_ROLE_FAIL;

  constructor(public payload: string) {}
}

export type Action =
  | LoadRoles
  | LoadRolesSuccess
  | LoadRolesFail
  | LoadRole
  | LoadRoleSuccess
  | LoadRoleFail
  | CreateRole
  | CreateRoleSuccess
  | CreateRoleFail
  | UpdateRole
  | UpdateRoleSuccess
  | UpdateRoleFail
  | DeleteRole
  | DeleteRoleSuccess
  | DeleteRoleFail;

