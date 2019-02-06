import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';

import { FunctionSetting } from '../../shared/functionSetting';

import { NavSlideMenuService } from './nav-slide-menu.service';
import { MenuManageModalService } from './menu-manage-modal/menu-manage-modal.service';

import { MenuManageModalComponent } from './menu-manage-modal/menu-manage-modal.component';

import { Menu } from './menu.model';

@Component({
  selector: 'app-nav-slide-menu',
  templateUrl: './nav-slide-menu.component.html',
  styleUrls: ['./nav-slide-menu.component.css']
})
export class NavSlideMenuComponent implements OnInit, OnDestroy {
  menuManageModalRef: MatDialogRef<MenuManageModalComponent>;
  // @ViewChild('ddww') menu: any;
  menus: Array<any>;
  isAll: Boolean;

  subsChangeMenus: Subscription;

  constructor(
    private navSlideMenuService: NavSlideMenuService,
    private menuManageModalService: MenuManageModalService,
    private elementRef: ElementRef,
    private dialog: MatDialog,
    private functionSetting: FunctionSetting
  ) { }

  ngOnInit() {
    this.subsChangeMenus = this.navSlideMenuService.getMenu().subscribe(res => {
      this.isAll = (res['is_all'] === 1 ? true : false);

      this.menuManageModalService.newDataMenu(res['menu_group']);
      this.subsChangeMenus = this.menuManageModalService.currentDataMenu.subscribe(data => {
        this.menus = data;
      });
    });
  }

  ngOnDestroy() {
    this.subsChangeMenus.unsubscribe();
  }

  openModalMenuManage() {
    this.menuManageModalRef = this.dialog.open(MenuManageModalComponent, this.functionSetting.modalSetting(true, "800px", this.menus));
    this.subsChangeMenus = this.menuManageModalRef.afterClosed().subscribe(data => {
      this.subsChangeMenus = this.navSlideMenuService.sortMenu(data).subscribe(res => {
        console.log(res, "update sort menu");
      });
    });
  }

  openGroupMenu(code: string) {
    // (document.querySelector('#cdk-overlay-0') as HTMLElement).style.marginLeft = '115px';
    // this.menu.openMenu();
    // code.nativeElement.click();
    // el.click();
    // let el: HTMLElement = this.code.nativeElement as HTMLElement;
    // el.click();
    console.log(code);
  }
}
