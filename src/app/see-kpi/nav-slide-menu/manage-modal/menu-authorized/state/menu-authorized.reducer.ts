import * as roleActions from "./menu-authorized.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { Role } from "../role.model";
import * as fromRoot from "../../../../state/app-state";

export interface RoleState extends EntityState<Role> {
  selectedRoleId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  roles: RoleState;
}

export const roleAdapter: EntityAdapter<Role> = createEntityAdapter<
  Role
>();

export const defaultRole: RoleState = {
  ids: [],
  entities: {},
  selectedRoleId: null,
  loading: false,
  loaded: false,
  error: ""
};

export const initialState = roleAdapter.getInitialState(defaultRole);

export function roleReducer(state = initialState, action: roleActions.Action): RoleState {
  switch (action.type) {
    case roleActions.RoleActionTypes.LOAD_ROLES_SUCCESS: {
      return roleAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case roleActions.RoleActionTypes.LOAD_ROLES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case roleActions.RoleActionTypes.LOAD_ROLE_SUCCESS: {
      return roleAdapter.addOne(action.payload, {
        ...state,
        selectedRoleId: action.payload.id
      });
    }
    case roleActions.RoleActionTypes.LOAD_ROLE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case roleActions.RoleActionTypes.CREATE_ROLE_SUCCESS: {
      return roleAdapter.addOne(action.payload, state);
    }
    case roleActions.RoleActionTypes.CREATE_ROLE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case roleActions.RoleActionTypes.UPDATE_ROLE_SUCCESS: {
      return roleAdapter.updateOne(action.payload, state);
    }
    case roleActions.RoleActionTypes.UPDATE_ROLE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case roleActions.RoleActionTypes.DELETE_ROLE_SUCCESS: {
      return roleAdapter.removeOne(action.payload, state);
    }
    case roleActions.RoleActionTypes.DELETE_ROLE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

const getRoleFeatureState = createFeatureSelector<RoleState>(
  "roles"
);

export const getRoles = createSelector(
  getRoleFeatureState,
  roleAdapter.getSelectors().selectAll
);

export const getRolesLoading = createSelector(
  getRoleFeatureState,
  (state: RoleState) => state.loading
);

export const getRolesLoaded = createSelector(
  getRoleFeatureState,
  (state: RoleState) => state.loaded
);

export const getError = createSelector(
  getRoleFeatureState,
  (state: RoleState) => state.error
);

export const getCurrentRoleId = createSelector(
  getRoleFeatureState,
  (state: RoleState) => state.selectedRoleId
);
export const getCurrentRole = createSelector(
  getRoleFeatureState,
  getCurrentRoleId,
  state => state.entities[state.selectedRoleId]
);
