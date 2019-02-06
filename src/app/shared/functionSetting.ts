import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionSetting {
  API: string = 'http://localhost/master-ng/api/public/';

  modalSetting(disableClose: boolean, width?: string, data?: object) {
    return {
      disableClose: disableClose,
      width: width,
      data: data
    }
  }
}
