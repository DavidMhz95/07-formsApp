import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {


  ngOnInit(): void {
    this.myform.reset({
      ...this.person
    })
  }


  private fb = new FormBuilder();
  public myform: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [true, Validators.requiredTrue],
  });

  public person = {
    gender:'F',
    wantNotifications: false
  }

  onSave() {
    if (this.myform.invalid) {
      this.myform.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.myform.value;
    this.person = newPerson;
    console.log(this.myform.value);

    console.log(this.person);


  }

  isValidField(field: string): boolean | null {
    return this.myform.controls[field].errors && this.myform.controls[field].touched
  }

  getErrorMessage(field: string): string | null {
    if (!this.myform.controls[field].errors) return null

    const errors = this.myform.controls[field].errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required'
        case 'minlength':
          return `This field must have at least ${errors['minlength'].requiredLength} characters`
        case 'min':
          return `The minimum valid value is ${errors['min'].min}`

      }

    }

    return null
  }

}
