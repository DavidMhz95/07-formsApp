import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cantBeStrider } from '../../../shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent{

  private fb = new FormBuilder();

  public myform = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['',[Validators.required, cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)] ],
    password2: ['', Validators.required],
    })


    isValidField(field: string) {
      //TODO obtenner de un servicio
    }

    onSubmit(){
      if(this.myform.invalid){
        this.myform.markAllAsTouched();
        return;
      }
      console.log(this.myform.value);
    }
}
