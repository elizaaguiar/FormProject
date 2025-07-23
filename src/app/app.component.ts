import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseUiComponent } from "./componentes/base-ui/base-ui.component";
import { ItemFormComponent } from "./componentes/item-form/item-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaseUiComponent, ItemFormComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FormProject';
}
