// import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
// import { DragulaService } from 'ng2-dragula';
// import { Subscription } from 'rxjs';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// import { MenuManageModalService } from './menu-manage-modal.service';
// import { NavSlideMenuService } from '../nav-slide-menu.service';

// import { FunctionSetting } from '../../../shared/functionSetting';

// @Component({
//   selector: 'app-menu-manage-modal',
//   templateUrl: './menu-manage-modal.component.html',
//   styleUrls: ['./menu-manage-modal.component.css']
// })
// export class MenuManageModalComponent implements OnInit, OnDestroy {
//   subs = new Subscription();
//   menuName: string;

//   constructor(
//     private dragulaService: DragulaService,
//     @Inject(MAT_DIALOG_DATA) public inputGroupMenu: Array<any>,
//     private menuManageModalService: MenuManageModalService,
//     public dialog: MatDialog,
//     private navSlideMenuService: NavSlideMenuService,
//     private functionSetting: FunctionSetting
//   ) {

//     this.dragulaService.destroy("COLUMNS");
//     this.dragulaService.createGroup("COLUMNS", {
//       direction: 'horizontal',
//       moves: (el, source, handle) => handle.className === "group-handle"
//     });

//     // You can also get all events, not limited to a particular group
//     this.subs.add(this.dragulaService.drop()
//       .subscribe(({ name, el, target, source, sibling }) => {
//         this.menuManageModalService.newDataMenu(this.inputGroupMenu);
//       })
//     );
//   }

//   ngOnInit() {
//   }

//   ngOnDestroy() {
//     this.subs.unsubscribe();
//   }

//   openAddMenuDialog(group: object): void {
//     const groupName = group['webpage_group_name'];
//     const groupId = group['webpage_group_id'];
//     const data = {
//       groupId: groupId,
//       groupName: groupName,
//       menuName: this.menuName
//     }
//     const addEditMenuRef = this.dialog.open(AddEditMenuDialog, this.functionSetting.modalSetting(true, '', data, false));
//     this.subs = addEditMenuRef.afterClosed().subscribe(data => {
//       if (data !== null) {
//         this.subs = this.menuManageModalService.addUpdateMenu(data).subscribe(res => {
//           if (res.status === 200) {
//             this.subs = this.navSlideMenuService.getMenu().subscribe(res => {
//               this.inputGroupMenu = res['menu_group'];
//               this.menuManageModalService.newDataMenu(this.inputGroupMenu);
//             });
//           } else {
//             console.log('validate');
//           }
//         });
//       }
//     });
//   }

//   openEditMenuDialog(menu: object, grpup: object): void {
//     const menuName = menu['webpage_name'];
//     const menuId = menu['webpage_id'];
//     const groupName = grpup['webpage_group_name'];
//     const groupId = grpup['webpage_group_id'];
//     const data = {
//       groupId: groupId,
//       groupName: groupName,
//       menuName: menuName,
//       menuId: menuId
//     }
//     const addEditMenuRef = this.dialog.open(AddEditMenuDialog, this.functionSetting.modalSetting(true, '', data, false));
//     this.subs = addEditMenuRef.afterClosed().subscribe(data => {
//       if (data !== null) {
//         this.subs = this.menuManageModalService.addUpdateMenu(data).subscribe(res => {
//           if (res.status === 200) {
//             this.subs = this.navSlideMenuService.getMenu().subscribe(res => {
//               this.inputGroupMenu = res['menu_group'];
//               this.menuManageModalService.newDataMenu(this.inputGroupMenu);
//             });
//           } else {
//             console.log('validate');
//           }
//         });
//       }
//     });
//   }

//   delMenu(menuId: Number, menuName: string) {
//     const data = {
//       menuName: menuName,
//       menuId: menuId
//     }
//     const deleteMenuRef = this.dialog.open(DeleteMenuDialog, this.functionSetting.modalSetting(true, '', data, false));
//     this.subs = deleteMenuRef.afterClosed().subscribe(resMenuId => {
//       if (resMenuId !== null) {
//         this.subs = this.menuManageModalService.delMenu(resMenuId).subscribe(res => {
//           if (res.status === 200) {
//             this.subs = this.navSlideMenuService.getMenu().subscribe(res => {
//               this.inputGroupMenu = res['menu_group'];
//               this.menuManageModalService.newDataMenu(this.inputGroupMenu);
//             });
//           } else {
//             console.log('validate');
//           }
//         });
//       }
//     });
//   }
// }

// @Component({
//   selector: 'add-edit-menu-dialog',
//   templateUrl: 'add-edit-menu-dialog.html',
// })
// export class AddEditMenuDialog {

//   constructor(
//     public addEditMenuRef: MatDialogRef<AddEditMenuDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: Array<any>
//   ) {
//   }
//   onNoClick(): void {
//     this.addEditMenuRef.close(null);
//   }
// }

// @Component({
//   selector: 'delete-menu-dialog',
//   templateUrl: 'delete-menu-dialog.html',
// })
// export class DeleteMenuDialog {
//   constructor(
//     public deleteMenuRef: MatDialogRef<DeleteMenuDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: Array<any>
//   ) {
//   }
//   onNoClick(): void {
//     this.deleteMenuRef.close(null);
//   }
// }
