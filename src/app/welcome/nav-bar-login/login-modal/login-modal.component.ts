import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/auth.service';
import { InformationComponent } from '../../../shared/information/information.component';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  form: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private signInModalRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService,
    private informationComponent: InformationComponent,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    }, {
        validator: [this.passwordEmpty, this.emailEmpty]
      });
  }

  passwordEmpty(form: FormGroup) {
    return form.get('password').value === "" ? { passwordEmpty: true } : null;
  }

  emailEmpty(form: FormGroup) {
    return form.get('email').value === "" ? { emailEmpty: true } : null;
  }

  logIn(form) {
    this.informationComponent.informationSnackBar();
    this.authService.authentication(form.value.email, form.value.password)
      .subscribe(
        res => {
          if (res === true) {
            this.informationComponent.informationSnackBar(200, 'Login Success!');
            this.close();
            // this.router.navigate(['/see-kpi']);
            window.open('/see-kpi', '_self');
          } else {
            this.informationComponent.informationSnackBar(401, 'Login Fail!');
          }
        });
  }

  close() {
    this.signInModalRef.close();
  }

}
