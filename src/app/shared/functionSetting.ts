import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionSetting {
  API = 'http://localhost/master-ng-api/public/';

  modalSetting(disableClose: boolean, width: string, data: object, focus: boolean) {
    return {
      disableClose: disableClose,
      width: width,
      data: data,
      autoFocus: focus
    };
  }
}
