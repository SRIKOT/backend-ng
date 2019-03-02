import { Component, OnInit } from '@angular/core';

import { RoleMenuService } from './role-menu.service';

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.css']
})
export class RoleMenuComponent implements OnInit {

  constructor(
    private roleMenuService: RoleMenuService
  ) { }

  ngOnInit() {
    this.roleMenuService.listRoleMenu().subscribe(res => {
      console.log(res);
    });
  }

}
