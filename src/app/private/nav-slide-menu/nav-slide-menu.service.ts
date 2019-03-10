import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../shared/auth.service';

import { FunctionSetting } from '../../shared/functionSetting';

@Injectable({
  providedIn: 'root'
})
export class NavSlideMenuService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private functionSetting: FunctionSetting
  ) { }

  getMenu() {
    return this.http.get(this.functionSetting.API + 'menu/getMenu');
  }
}
