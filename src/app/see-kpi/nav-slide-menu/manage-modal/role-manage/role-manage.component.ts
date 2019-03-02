import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
// import { MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Store, select } from '@ngrx/store';

import * as roleActions from './state/role-manage.actions';
import * as fromRole from './state/role-manage.reducer';

import { RoleManageService } from './role-manage.service';
import { FunctionSetting } from '../../../../shared/functionSetting';

import { Role } from './role.model';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css']
})
export class RoleManageComponent implements OnInit, OnDestroy {
  subs: Subscription;
  subsForm: Subscription;

  // displayedColumns: string[] = ['role_name', 'is_all_user', 'is_active', 'manage'];
  dataSource$: Observable<Role[]>;
  error$: Observable<String>;

  @ViewChild('formTarget') formTarget: ElementRef;
  @ViewChild('scrollingBottom') scrollingBottom: ElementRef;
  form: FormGroup;

  validatorName: Object = {
    role_name: ''
  };

  constructor(
    private manageAuthorizedService: RoleManageService,
    private store: Store<fromRole.AppState>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private functionSetting: FunctionSetting
  ) { }

  ngOnInit() {
    this.loadRoles();
    this.createForm();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.subsForm.unsubscribe();
  }

  loadRoles() {
    this.store.dispatch(new roleActions.LoadRoles());
    this.dataSource$ = this.store.pipe(select(fromRole.getRoles));
    this.error$ = this.store.pipe(select(fromRole.getError));
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      role_name: ['', [
        Validators.required
      ]],
      is_all_user: [false],
      is_active: [false],
      titleAddEdit: ['Add'],
      addTitleDelete: false
    });
  }

  errorsMessages(msg: Object) {
    const arrayValidator = Object.getOwnPropertyNames(this.validatorName);
    for (const key in msg) {
      if (arrayValidator[0] === key) {
        this.validatorName['role_name'] = msg[key][0];
      }
    }
    return this.validatorName;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  addEditRole(form) {
    const roleData: Role = {
      id: form.value.id,
      role_name: form.value.role_name,
      is_all_user: form.value.is_all_user,
      is_active: form.value.is_active
    };

    this.subs = this.manageAuthorizedService.updateRole(roleData).subscribe(res => {
      if (res['status'] === 200) {
        if (roleData.id) {
          document.getElementById(`roleTR-${form.value.id}`).scrollIntoView({ behavior: 'smooth' });
          this.store.dispatch(new roleActions.UpdateRole(roleData));
          this.subsForm.unsubscribe();
        } else {
          this.scrollingBottom.nativeElement.scrollIntoView({ behavior: 'smooth' });
          this.store.dispatch(new roleActions.CreateRole(roleData));
          this.loadRoles();
        }
        this.createForm();
      } else if (res['status'] === 400) {
        this.errorsMessages(res['data'][0]);
        this.validateAllFormFields(this.form);
      }
    });
    // this.store.dispatch(new roleActions.CreateRole({ 'id': null, 'role_name': '', 'is_all_user': false, 'is_active': true }));
    // this.elementData.push({ 'id': null, 'role_name': '', 'is_all_user': false, 'is_active': true });
    // this.dataSource = new MatTableDataSource({ 'id': null, 'role_name': '', 'is_all_user': false, 'is_active': true });
  }

  getRole(id: number) {
    this.store.dispatch(new roleActions.LoadRole(id));
    const role$: Observable<Role> = this.store.select(
      fromRole.getCurrentRole
    );

    // this.formTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.formTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.subsForm = role$.subscribe(currentRole => {
      if (currentRole) {
        this.form = this.formBuilder.group({
          id: [currentRole.id, [
            Validators.required
          ]],
          role_name: [currentRole.role_name, [
            Validators.required
          ]],
          is_all_user: [currentRole.is_all_user],
          is_active: [currentRole.is_active],
          titleAddEdit: ['Save'],
          addTitleDelete: true
        });
      }
    });
  }

  deleteRole(form) {
    const roleData: Role = {
      id: form.value.id,
      role_name: form.value.role_name,
      is_all_user: form.value.is_all_user,
      is_active: form.value.is_active
    };

    const deleteRoleRef = this.dialog.open(DeleteRoleDialog, this.functionSetting.modalSetting(true, '', roleData, true));
    this.subs = deleteRoleRef.afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(new roleActions.DeleteRole(res));
        this.createForm();
      }
    });
  }
}

@Component({
  selector: 'app-delete-role-dialog',
  template: `
  <h1 mat-dialog-title>Dialog Delete</h1>
  <div mat-dialog-content>
    Are you sure to delete role {{data.role_name}}?
  </div>
  <div mat-dialog-actions>
    <button mat-raised-button (click)="delete(data.id)" color="warn">Yes</button>
    <button mat-raised-button (click)="close()">No</button>
  </div>
  `
})
export class DeleteRoleDialog {
  constructor(
    public deleteRoleRef: MatDialogRef<DeleteRoleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>
  ) {
  }

  delete(id: number) {
    this.deleteRoleRef.close(id);
  }

  close() {
    this.deleteRoleRef.close();
  }
}

