import { Component, Directive, HostListener } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ViaCepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade : string;
  estado: string;
}
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
  addressForm() {
    const dados = this.form.getRawValue();
    this.http.post('http://localhost:4200/address', dados).subscribe({
      next: res => console.log('Enviado com sucesso', res),
      error: err => console.error('Erro ao enviar', err)
    });
  }
  ngOnInit(): void {
    this.form.get('cep')?.valueChanges.subscribe(cep => {
      if (cep && cep.toString().length === 8) {
        this.searchCep(cep);
      }
    });
  }

  searchCep(cep: number): void {
    this.http.get<ViaCepData>(`https://viacep.com.br/ws/${cep}/json/`).pipe(
      tap((response: ViaCepData) => {
        this.form.patchValue({
          logradouro: response.logradouro || '',
          bairro: response.bairro || '',
          cidade: response.localidade || '',
          estado: response.estado || ''
        });
      }),
      catchError((error) => of(console.error('Erro ao buscar CEP', error)))
    ).subscribe();
  }

}
