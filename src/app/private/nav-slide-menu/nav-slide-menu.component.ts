import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { FunctionSetting } from '../../shared/functionSetting';

import { NavSlideMenuService } from './nav-slide-menu.service';
import { ManageModalService } from './manage-modal/manage-modal.service';

import { ManageModalComponent } from './manage-modal/manage-modal.component';

import { Menu } from './menu.model';

@Component({
  selector: 'app-nav-slide-menu',
  templateUrl: './nav-slide-menu.component.html',
  styleUrls: ['./nav-slide-menu.component.css']
})
export class NavSlideMenuComponent implements OnInit, OnDestroy {
  manageModalRef: MatDialogRef<ManageModalComponent>;
  menus: Array<Menu[]>;
  isAll: Boolean;

  subsChangeMenus: Subscription;

  constructor(
    private navSlideMenuService: NavSlideMenuService,
    private manageModalService: ManageModalService,
    private dialog: MatDialog,
    private functionSetting: FunctionSetting,
    private router: Router
  ) { }

  ngOnInit() {
    this.subsChangeMenus = this.navSlideMenuService.getMenu().subscribe(res => {
      this.isAll = (res['is_all'] === 1 ? true : false);

      this.manageModalService.newDataMenu(res['menu_group']);
      this.subsChangeMenus = this.manageModalService.currentDataMenu.subscribe(data => {
        this.menus = data;
      });
    });
  }

  ngOnDestroy() {
    this.subsChangeMenus.unsubscribe();
  }

  openModalManage() {
    this.router.navigate(['/private/manage-modal']);
    this.manageModalRef = this.dialog.open(ManageModalComponent, this.functionSetting.modalSetting(false, '100vw', this.menus, false));
  }
}
