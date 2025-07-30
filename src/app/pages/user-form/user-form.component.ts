import { NgClass } from '@angular/common';
import { Component, Directive, HostListener } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, Form, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

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
    return { idadeFilho: false };
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
export interface IAddress {
    cep: FormControl<number | null>;
    logradouro: FormControl<string>;
    complemento: FormControl <string>;
    bairro: FormControl<string>;
    cidade: FormControl<string>;
    estado: FormControl<string>;
    id: FormControl<string>;
  }
@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule, InputCaractersDirective, NgClass],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  form: FormGroup<FormUser>;
  constructor(private route: Router) {
    this.form = new FormGroup<FormUser>({
      nome: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(200)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      idadePai: new FormControl(null, [Validators.required, validarPaternidade]),
      idadeFilho: new FormControl(null, [Validators.required, validarPaternidade]),
      paternity: new FormControl<boolean | null>(null, [validarPaternidade]),
      primos: new FormArray<FormGroup<PrimoForm>>([]),
    })
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
  removePrimo(index: number) {
    if (this.primos.length == 0) {
      return;
    }
    this.primos.controls.splice( index, 1);
  }

  onSubmit() {
    if (this.form.valid) {
      this.route.navigate(['address', this.route]);
    } else {
      this.form.markAllAsTouched();
    } console.log('Formulário Inválido');
  }
}
