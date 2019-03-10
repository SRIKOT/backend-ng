import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RoleMenuService } from './role-menu.service';

import { Role, Menu, MenuInRole } from './role-menu.model';

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.css']
})
export class RoleMenuComponent implements OnInit, OnDestroy {
  subs: Subscription;
  menus: Menu[];
  roles: Role[];

  constructor(
    private roleMenuService: RoleMenuService
  ) { }

  ngOnInit() {
    this.loadRoleMenu();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadRoleMenu() {
    this.subs = this.roleMenuService.listRoleMenu().subscribe(res => {
      this.menus = res['menu'];
      this.roles = res['role'];
    });
  }

  manageMenu(roleMenu: Role) {
    this.roleMenuService.updateRoleMenu(roleMenu).toPromise();
  }

}
