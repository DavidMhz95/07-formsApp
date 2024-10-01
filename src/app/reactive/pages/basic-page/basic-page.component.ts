import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';



const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  stock: 5
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {


  ngOnInit(): void {
    // this.myForm.reset(rtx5090)
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  getErrorMessage(field: string): string | null {
    if (!this.myForm.controls[field].errors) return null

    const errors = this.myForm.controls[field].errors || {}

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

  //Forma de hacer con formgroup
  // public myForm:FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0),
  //   stock: new FormControl(0)
  // });

  //Con formbuilder
  private fb: FormBuilder = new FormBuilder();
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  })


  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }
    console.log(this.myForm.value)

    this.myForm.reset({
      //name: '',
      price: 0,
      stock: 0
    })

  }
}
