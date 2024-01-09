import { Component, OnChanges, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginApiService } from '../services/login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginApi: LoginApiService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group(
      {
        username: new FormControl('shikha', Validators.required),
        password: new FormControl('****', Validators.minLength(5)),
        confirmpassword: new FormControl('****', [
          Validators.required,
          this.customValidator.bind(this),
        ]),
      },
      {
        validators: this.customValidator.bind(this),
      }
    );
  }

  ngOnInit() {
    console.log(
      this.loginForm.get('password')?.value,
      this.loginForm.get('confirmpassword')?.value
    );
    this.loginForm
      .get('confirmpassword')
      ?.valueChanges.subscribe((password) => {
        console.log('confirmpassword changed');
        console.log(password);
        if (
          this.loginForm.get('password')?.value !==
          this.loginForm.get('confirmpassword')?.value
        ) {
          this.loginForm
            .get('confirmpassword')
            ?.setErrors({ passwordNotMatch: true });
          this.loginForm.setErrors({ invalidForm: true });
        } else {
          this.loginForm.setErrors({ invalidForm: false });
        }
      });
  }

  customValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    if (
      control.get('password')?.value !== control.get('confirmpassword')?.value
    ) {
      control.get('confirmpassword')?.setErrors({ passwordNotMatch: true });
      return { passwordNotMatch: true };
    }
    return null;
  };

  onSubmit() {
    console.log(this.loginForm.value.username, this.loginForm.value.password);
    this.loginApi.doLogin().subscribe((resp) => {
      console.log(resp);
      const user = resp.find((a: any) => {
        return (
          a.email === this.loginForm.value.username &&
          a.password === this.loginForm.value.password
        );
      });
      if (user) {
        alert('Login Succesful');
        this.loginForm.reset();
        this.router.navigate(['weather']);
      } else {
        alert('user not found');
      }
    });
  }
}
