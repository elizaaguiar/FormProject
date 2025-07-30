import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface FormUser {}
@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent {
  
}
