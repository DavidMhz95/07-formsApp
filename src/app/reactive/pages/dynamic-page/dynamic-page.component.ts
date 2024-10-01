import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {


  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  private fb:FormBuilder = new FormBuilder();
  get favGames() {
    return this.form.get('favGames') as FormArray;
  }

  public form:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favGames: this.fb.array([
      ['God of War', Validators.required],
      ['The Last of Us', Validators.required]
    ]),
  });



  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    console.log(this.form.value);
    (this.form.controls['favGames'] as FormArray) = this.fb.array([])
    this.form.reset()
  }



  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors && this.form.controls[field].touched
  }

  getErrorMessage(field: string): string | null {
    if (!this.form.controls[field].errors) return null

    const errors = this.form.controls[field].errors || {}

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

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched
  }

  onDeleteFavGame(index: number) {
    this.favGames.removeAt(index)
  }

  onAddFavGame() {
    if(this.newFavorite.invalid) return
    const newGame = this.newFavorite.value
    this.favGames.push(this.fb.control(newGame, Validators.required))
    this.newFavorite.reset()
  }

}
