import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    if (!this.authService.getToken()) {
      console.log('!canActivate');
      this.router.navigate(['/public']);
      return false;
    }

    console.log('canActivate');
    return true;
  }
}
