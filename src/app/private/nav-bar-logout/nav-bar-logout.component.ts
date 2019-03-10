import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { FunctionSetting } from '../../shared/functionSetting';

import { LogoutModalComponent } from './logout-modal/logout-modal.component';

@Component({
  selector: 'app-nav-bar-logout',
  templateUrl: './nav-bar-logout.component.html',
  styleUrls: ['./nav-bar-logout.component.css']
})
export class NavBarLogoutComponent implements OnInit {
  logOutModalRef: MatDialogRef<LogoutModalComponent>;
  @Output() snavEvent: EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private functionSetting: FunctionSetting
  ) { }

  ngOnInit() {
  }

  openModalLogOut() {
    this.logOutModalRef = this.dialog.open(LogoutModalComponent, this.functionSetting.modalSetting(false, '240px', {}, false));
    this.logOutModalRef.updatePosition({ top: '25px', right: '25px' });

    this.logOutModalRef.afterClosed().subscribe(res => {
      // if(res===true) {
      //   console.log(res,'1');
      //   this.snavEvent.emit(res);
      // }
    });
  }
}
