import { ValidatorServiceService } from './../../../shared/services/validator.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../../shared/validators/email.validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent  {

  // public myform: FormGroup
  public myform!: FormGroup;

  constructor(private fb: FormBuilder, private validatorService: ValidatorServiceService, private emailValidator:EmailValidator) {
    this.myform = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
      // email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [new EmailValidator()]],
      email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
      username: ['', [Validators.required, this.validatorService.cantBeStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
    },{
      validators:[this.validatorService.isFieldOneEqualToFieldTwo('password','password2')]
    });
  }


  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myform, field);
  }


  onSubmit() {
    this.myform.markAllAsTouched();
  }
}
