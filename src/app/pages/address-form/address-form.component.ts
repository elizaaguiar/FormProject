import { Component, Directive, HostListener } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Directive({
  selector: '[inputCaracters]',
  standalone: true,
})
export class InputCaractersDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === '.' || event.key.toLowerCase() === 'e') {
      event.preventDefault();
    }
  }
}
export interface IAddress {
  cep: FormControl<number | null>;
  logradouro: FormControl<string>;
  complemento: FormControl<string>;
  bairro: FormControl<string>;
  cidade: FormControl<string>;
  estado: FormControl<string>;
  id: FormControl<string>;
}
@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule, InputCaractersDirective, HttpClientModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
  standalone: true
})
export class AddressFormComponent implements OnInit {
  form: FormGroup<IAddress>;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = new FormGroup({
      cep: new FormControl<number | null>(null, { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8)] }),
      logradouro: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      complemento: new FormControl<string>('', { nonNullable: true }),
      bairro: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      cidade: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      estado: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      id: new FormControl<string>('', { nonNullable: true })
    });
  }
  ngOnInit() {
    this.form.get('cep')!.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(cep => this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`))
      )
      .subscribe(data => {
        if (!data.erro) {
          this.form.patchValue({
            logradouro: data.logradouro,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            id: data.id
          });

        }

      }}
}