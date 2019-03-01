import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ManageModalService } from './manage-modal.service';

@Component({
  selector: 'app-manage-modal',
  templateUrl: './manage-modal.component.html',
  styleUrls: ['./manage-modal.component.css']
})
export class ManageModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataMenu: Array<any>,
    private manageModalService: ManageModalService,
    public manageModalRef: MatDialogRef<ManageModalComponent>,
  ) {
  }

  ngOnInit() {
  }

  inputDataMenu(data) {
    this.manageModalService.sortMenu(data).toPromise();
    this.manageModalService.newDataMenu(data);
  }

  close() {
    this.manageModalRef.close();
  }
}
