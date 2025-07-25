import { Component, Directive } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, Form, AbstractControl, ValidationErrors } from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { Validator } from '@angular/forms';

@Directive({
  selector: '[inputCaracters]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputCaractersDirective),
      multi: true
    }
  ]
})
export class InputCaractersDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const valor= String(control.value);
    const regex = '/.e/';
    if (/regex/.test(String(control.value))){
      return { numberInvalid: true };
    }
    return null;
  }
}
function validarPaternidade(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if(valor == null) {
    return null;
  }
  if (valor < 0){
    return {idadeFilho: true};
  }
  if (!(valor >= 18 && valor < 190)){
    return {idadePai: true};
  }
  if(valor.idadePai < valor.idadeFilho){
    return {paternity: false};
  }
  return null;
}

interface FormUser {
    nome: FormControl <string>;
    email: FormControl <string>;
    idadePai: FormControl <number | null>; 
    idadeFilho: FormControl <number | null>;
    paternity?: FormControl<boolean | null>;
}

@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})

export class ItemFormComponent implements ValidationErrors {
  form: FormGroup<FormUser>;
  constructor () {
    this.form = new FormGroup<FormUser> ({
      nome: new FormControl ('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(200)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email]}),
      idadePai: new FormControl (null, [Validators.required, validarPaternidade]),
      idadeFilho: new FormControl (null, [Validators.required, validarPaternidade]),
      paternity: new FormControl <boolean | null> (null, [validarPaternidade])
    });
  }
  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
    } else { this.form.markAllAsTouched();
    } console.log('Formulário Inválido');
  }
  
}
