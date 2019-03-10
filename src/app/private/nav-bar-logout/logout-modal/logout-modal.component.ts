import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent {

  constructor(
    private signOutModalRef: MatDialogRef<LogoutModalComponent>,
    private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.close(true);
    this.authService.logout();
    window.open('/public', '_self');
    //this.router.navigate(['/home']);
  }

  close(closeSlideMenu?: boolean) {
    this.signOutModalRef.close(closeSlideMenu);
  }

}
