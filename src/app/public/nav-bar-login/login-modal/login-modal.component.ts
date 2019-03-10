import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/auth.service';
import { InformationComponent } from '../../../shared/information/information.component';

/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : { childrenNotEqual: true };
  }
}

/**
* Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
*/
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}

/**
* Collection of reusable RegExps
*/
export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

/**
* Collection of reusable error messages
*/
export const errorMessages: { [key: string]: string } = {
  userCode: 'UserCode is Required',
  password: 'Password is Required',
  // email: 'Email must be a valid email address (username@domain)',
  // confirmEmail: 'Email addresses must match',
  // password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
  // confirmPassword: 'Passwords must match'
};

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  form: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;

  constructor(
    private formBuilder: FormBuilder,
    private signInModalRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService,
    private informationComponent: InformationComponent,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userCode: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
    // this.createForm();
  }

  // createForm() {
  //   this.form = this.formBuilder.group({
  //     userCode: ['', [
  //       Validators.required,
  //       Validators.minLength(1),
  //       Validators.maxLength(255)
  //     ]],
  //     emailGroup: this.formBuilder.group({
  //       email: ['', [
  //         Validators.required,
  //         Validators.email
  //       ]],
  //       confirmEmail: ['', Validators.required]
  //     }, { validator: CustomValidators.childrenEqual }),
  //     passwordGroup: this.formBuilder.group({
  //       password: ['', [
  //         Validators.required,
  //         Validators.pattern(regExps.password)
  //       ]],
  //       confirmPassword: ['', Validators.required]
  //     }, { validator: CustomValidators.childrenEqual })
  //   });
  // }

  // register(): void {
  //   // API call to register your user
  // }

  logIn(form) {
    this.informationComponent.informationSnackBar();
    this.authService.authentication(form.value.userCode, form.value.password)
      .subscribe(
        res => {
          if (res === true) {
            this.informationComponent.informationSnackBar(200, 'Login Success!');
            this.close();
            // this.router.navigate(['/see-kpi']);
            window.open('/private', '_self');
          } else {
            this.informationComponent.informationSnackBar(401, 'Login Fail!');
          }
        });
  }

  close() {
    this.signInModalRef.close();
  }

}
