import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseUiComponent } from "./componentes/base-ui/base-ui.component";

@Component({
  selector: 'app-root',
  imports: [ BaseUiComponent, ReactiveFormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FormProject';
}
