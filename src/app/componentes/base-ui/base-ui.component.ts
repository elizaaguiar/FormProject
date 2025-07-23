import { Component } from '@angular/core';
import { ItemFormComponent } from "../item-form/item-form.component";

import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-base-ui',
  imports: [ItemFormComponent, ReactiveFormsModule],
  templateUrl: './base-ui.component.html',
  styleUrl: './base-ui.component.scss'
})
export class BaseUiComponent {

}
