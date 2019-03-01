import { Component, OnInit, OnDestroy, Inject, EventEmitter, Output, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MenuManageService } from './menu-manage.service';
import { NavSlideMenuService } from '../../nav-slide-menu.service';

import { FunctionSetting } from '../../../../shared/functionSetting';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.css']
})
export class MenuManageComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  menuName: string;

  @Input() inputDataMenu: Array<any>;
  @Output() dataMenu: EventEmitter<any> = new EventEmitter();
  @Output() addMenu: EventEmitter<any> = new EventEmitter();

  constructor(
    private dragulaService: DragulaService,
    private menuManageService: MenuManageService,
    public dialog: MatDialog,
    private navSlideMenuService: NavSlideMenuService,
    private functionSetting: FunctionSetting
  ) {

    this.dragulaService.destroy('COLUMNS');
    this.dragulaService.createGroup('COLUMNS', {
      direction: 'horizontal',
      moves: (el, source, handle) => handle.className === 'group-handle'
    });

    // You can also get all events, not limited to a particular group
    this.subs.add(this.dragulaService.drop()
      .subscribe(({ name, el, target, source, sibling }) => {
        console.log(this.inputDataMenu, 'menu-manage');
        this.dataMenu.emit(this.inputDataMenu);
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  openAddMenuDialog(group: object): void {
    const groupName = group['page_group_name'];
    const groupId = group['page_group_id'];
    const data = {
      groupId: groupId,
      groupName: groupName,
      menuName: this.menuName
    };

    const addEditMenuRef = this.dialog.open(AddEditMenuDialog, this.functionSetting.modalSetting(true, '', data, false));
    this.subs = addEditMenuRef.afterClosed().subscribe(res => {
      if (res === 200) {
        this.subs = this.navSlideMenuService.getMenu().subscribe(res2 => {
          this.inputDataMenu = res2['menu_group'];
          this.dataMenu.emit(this.inputDataMenu);
        });
      }
    });
  }

  openEditMenuDialog(menu: object, grpup: object): void {
    const menuName = menu['page_name'];
    const menuId = menu['page_id'];
    const groupName = grpup['page_group_name'];
    const groupId = grpup['page_group_id'];
    const data = {
      groupId: groupId,
      groupName: groupName,
      menuName: menuName,
      menuId: menuId
    };

    const addEditMenuRef = this.dialog.open(AddEditMenuDialog, this.functionSetting.modalSetting(true, '', data, false));
    this.subs = addEditMenuRef.afterClosed().subscribe(res => {
      if (res === 200) {
        this.subs = this.navSlideMenuService.getMenu().subscribe(res2 => {
          this.inputDataMenu = res2['menu_group'];
          this.dataMenu.emit(this.inputDataMenu);
        });
      }
    });
  }

  delMenu(menuId: Number, menuName: string) {
    const data = {
      menuName: menuName,
      menuId: menuId
    };
    const deleteMenuRef = this.dialog.open(DeleteMenuDialog, this.functionSetting.modalSetting(true, '', data, false));
    this.subs = deleteMenuRef.afterClosed().subscribe(res => {
      if (res === 200) {
        this.subs = this.navSlideMenuService.getMenu().subscribe(res2 => {
          this.inputDataMenu = res2['menu_group'];
          this.dataMenu.emit(this.inputDataMenu);
        });
      }
    });
  }
}

@Component({
  selector: 'add-edit-menu-dialog',
  templateUrl: 'add-edit-menu-dialog.html',
})
export class AddEditMenuDialog {
  subs: Subscription;

  constructor(
    public addEditMenuRef: MatDialogRef<AddEditMenuDialog>,
    private menuManageService: MenuManageService,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>
  ) {
  }

  save(data) {
    this.subs = this.menuManageService.addUpdateMenu(data).subscribe(res => {
      if (res.status === 200) {
        this.addEditMenuRef.close(200);
      } else {
        console.log('add edit error');
      }
    });
  }

  close() {
    this.addEditMenuRef.close();
  }
}

@Component({
  selector: 'delete-menu-dialog',
  templateUrl: 'delete-menu-dialog.html',
})
export class DeleteMenuDialog {
  subs: Subscription;

  constructor(
    private menuManageService: MenuManageService,
    public deleteMenuRef: MatDialogRef<DeleteMenuDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>
  ) {
  }

  delete(id: Number) {
    this.subs = this.menuManageService.delMenu(id).subscribe(res => {
      if (res.status === 200) {
        this.deleteMenuRef.close(200);
      } else {
        console.log('delete error');
      }
    });
  }

  close() {
    this.deleteMenuRef.close();
  }
}
