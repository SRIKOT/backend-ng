import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
// import { MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';

import * as roleActions from './state/menu-authorized.actions';
import * as fromRole from './state/menu-authorized.reducer';

import { ManageAuthorizedService } from './menu-authorized.service';

import { Role } from './role.model';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FunctionSetting } from '../../../../shared/functionSetting';

@Component({
  selector: 'app-menu-authorized',
  templateUrl: './menu-authorized.component.html',
  styleUrls: ['./menu-authorized.component.css']
})
export class MenuAuthorizedComponent implements OnInit, OnDestroy {
  subs: Subscription;

  dataSource$: Observable<Role[]>;
  error$: Observable<String>;

  form: FormGroup;

  validatorName: Object = {
    role_name: ''
  };

  constructor(
    private manageAuthorizedService: ManageAuthorizedService,
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
      is_active: [false]
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
          this.store.dispatch(new roleActions.UpdateRole(roleData));
        } else {
          this.store.dispatch(new roleActions.CreateRole(roleData));
          this.loadRoles();
        }
        this.form.reset();
      } else if (res['status'] === 400) {
        this.errorsMessages(res['data'][0]);
        this.validateAllFormFields(this.form);
      }
    });
    // this.store.dispatch(new roleActions.CreateRole({ 'id': null, 'role_name': '', 'is_all_user': false, 'is_active': true }));
    // this.elementData.push({ 'id': null, 'role_name': '', 'is_all_user': false, 'is_active': true });
    // this.dataSource = new MatTableDataSource({ 'id': null, 'role_name': '', 'is_all_user': false, 'is_active': true });
  }

  editRole(id: number) {
    this.store.dispatch(new roleActions.LoadRole(id));
    const role$: Observable<Role> = this.store.select(
      fromRole.getCurrentRole
    );

    this.subs = role$.subscribe(currentRole => {
      if (currentRole) {
        this.form = this.formBuilder.group({
          id: [currentRole.id, [
            Validators.required
          ]],
          role_name: [currentRole.role_name, [
            Validators.required
          ]],
          is_all_user: [currentRole.is_all_user],
          is_active: [currentRole.is_active]
        });
      }
    });
  }

  addRole() {
    const addEditRoleRef = this.dialog.open(AddEditAuthorizedDialog, this.functionSetting.modalSetting(true, '50vw', {}, false));
    this.subs = addEditRoleRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }
}

@Component({
  selector: 'app-add-edit-authorized-dialog',
  templateUrl: 'add-edit-authorized-dialog.html',
  styleUrls: ['./menu-authorized.component.css']
})
export class AddEditAuthorizedDialog implements OnInit, OnDestroy {
  subs: Subscription;

  form: FormGroup;

  validatorName: Object = {
    role_name: ''
  };

  constructor(
    public addEditRoleRef: MatDialogRef<AddEditAuthorizedDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Array<any>,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      role_name: ['', [
        Validators.required
      ]],
      is_all_user: [false],
      is_active: [false]
    });
  }

  close() {
    this.addEditRoleRef.close();
  }
}
