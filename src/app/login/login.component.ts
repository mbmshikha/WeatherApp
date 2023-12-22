import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder) {
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

  customValidator: ValidatorFn = (): ValidationErrors | null => {
    return null;
  };
}
