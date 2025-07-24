import { Component } from '@angular/core';
import { ItemFormComponent } from "../item-form/item-form.component";

import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-base-ui',
  //vc n usa o ItemFormComponent em nenhum lugar do componente, entao nao devia estar importado aqui
  imports: [ItemFormComponent, ReactiveFormsModule],
  templateUrl: './base-ui.component.html',
  styleUrl: './base-ui.component.scss'
})
export class BaseUiComponent {

}
