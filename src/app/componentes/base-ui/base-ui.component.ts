import { Component } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-base-ui',
  imports: [ ReactiveFormsModule],
  templateUrl: './base-ui.component.html',
  styleUrl: './base-ui.component.scss'
})
export class BaseUiComponent {

}
