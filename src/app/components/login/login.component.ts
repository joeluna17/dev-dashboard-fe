import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../../services/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.fb.group({
    userName: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  public asyncErrorMessage: string = null;

  constructor(private fb: FormBuilder, private _appService: AppService) {}

  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {}

  submitLogin() {
    console.log('Logging in', this.loginForm.value);
    this.asyncErrorMessage = null;
    this._appService
      .loginUser(this.loginForm.value)
      .toPromise()
      .then((res) => {
        console.log(res);
        this.asyncErrorMessage = 'Login Successful';
      })
      .catch((error) => {
        console.warn(error), (this.asyncErrorMessage = error.error);
      });
  }
}
