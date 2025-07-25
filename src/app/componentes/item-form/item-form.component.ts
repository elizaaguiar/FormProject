import { NgClass, NgFor } from '@angular/common';
import { Component, Directive, HostListener } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, Form, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';

@Directive({
  selector: '[inputCaracters]',
  standalone: true
})
export class InputCaractersDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === '.' || event.key.toLowerCase() === 'e') {
      event.preventDefault();
    }
  }
}
function validarPaternidade(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (valor == null) {
    return null;
  }
  if (valor < 0) {
    return { idadeFilho: true };
  }
  if (!(valor >= 18 && valor < 190)) {
    return { idadePai: true };
  }
  if (valor.idadePai < valor.idadeFilho) {
    return { paternity: false };
  }
  return null;
}
type PrimoForm = {
  nome: FormControl<string>;
}

interface FormUser {
  nome: FormControl<string>;
  email: FormControl<string>;
  idadePai: FormControl<number | null>;
  idadeFilho: FormControl<number | null>;
  paternity?: FormControl<boolean | null>;
  primos: FormArray<FormGroup<PrimoForm>>;
}
@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule, InputCaractersDirective, NgClass],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements ValidationErrors {
  form: FormGroup<FormUser>;
  constructor() {
    this.form = new FormGroup<FormUser>({
      nome: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(200)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      idadePai: new FormControl(null, [Validators.required, validarPaternidade]),
      idadeFilho: new FormControl(null, [Validators.required, validarPaternidade]),
      paternity: new FormControl<boolean | null>(null, [validarPaternidade]),
      primos: new FormArray<FormGroup<PrimoForm>>([]),
    });
  }
ngOnInit() {
  this.addPrimo(); 
}
  get primos(): FormArray<FormGroup<PrimoForm>> {
  return this.form.get('primos') as FormArray<FormGroup<PrimoForm>>;
}

  addPrimo() {
    const newPrimo = new FormGroup<PrimoForm>({
      nome: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(200)]
      })
    });
    
    this.primos.push(newPrimo);
  }
  removePrimo(index: number){
    this.primos.controls.splice(index, 1);
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    } console.log('Formulário Inválido');
  }
}
