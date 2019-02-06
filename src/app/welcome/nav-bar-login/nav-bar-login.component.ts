import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { FunctionSetting } from '../../shared/functionSetting';

import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-nav-bar-login',
  templateUrl: './nav-bar-login.component.html',
  styleUrls: ['./nav-bar-login.component.css']
})
export class NavBarLoginComponent implements OnInit {
  logInModalRef: MatDialogRef<LoginModalComponent>;

  constructor(
    private dialog: MatDialog,
    private functionSetting: FunctionSetting
  ) { }

  ngOnInit() {
  }

  openModalLogIn() {
    this.logInModalRef = this.dialog.open(LoginModalComponent, this.functionSetting.modalSetting(false, "500px"));
  }
}
