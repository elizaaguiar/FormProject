import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, Form, AbstractControl, ValidationErrors } from '@angular/forms';


//crie um arquivo para essas funcoes que sao validacoes
function validarNome(control: AbstractControl): ValidationErrors [string] {
  const name = control.value;
  if(name == null) {
    return null;
  }
  // if (){
  //   return {nomeInvalido: true}
  // }
}
//usar input="number" para o usuario nao conseguir escrever letras
// estudar sobre diretivas, para nao deixa o usuario escrever 'e' e '.'
function validarIdade(control: AbstractControl): ValidationErrors [number] | null {
  const valor = control.value;
  if(!Number.isInteger(valor)){
    return {naoInteiro: true}
  }
  return null;
}
//existe validacoes que vc pode aplicar no formGroup inteiro para poder verificar os valores de qualquer formControl, como o seu caso
// vc quer consultar o valor de idadepai e idadefilho (dois formControls), acredito que esse seja o caso, entao
// pesquise sobre validators no FORMGROUP.
function validarPaternidade(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if(valor == null) {
    return null;
  }
  if (!(valor < 18)){
    return {idadeFilho: true};
  }
  if (!(valor >= 18 && valor < 190)){
    return {idadePai: true};
  }
  if(valor.idadePai < valor.idadeFilho){
    return {paternidade: false};
  }

  return null;
}

interface FormUser {
    nome: FormControl <string>;
    email: FormControl <string>;
    idadePai: FormControl <number | null>; 
    idadeFilho: FormControl <number | null>;
}

@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})

export class ItemFormComponent {
  form: FormGroup<FormUser>;
  constructor () {
    this.form = new FormGroup<FormUser> ({
      nome: new FormControl ('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(200)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email]}),
      idadePai: new FormControl (null, [Validators.required, validarIdade, validarPaternidade]),
      idadeFilho: new FormControl (null, [Validators.required, validarIdade, validarPaternidade])
    });
  }
  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
    } else { this.form.markAllAsTouched();
    } console.log('Formulário Inválido');
  }
}
