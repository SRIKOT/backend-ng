export interface RoleMenu {
  role: Role;
  menu: Menu;
}

export interface Menu {
  page_id: number;
  page_name: string;
}

export interface Role {
  id: number;
  role_name: string;
  menu: Array<MenuInRole>;
}

export interface MenuInRole {
  selected: boolean;
  page_id: number;
}
