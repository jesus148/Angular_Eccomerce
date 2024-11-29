import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/ui/header/header.component';

// selector
@Component({
  selector: 'app-root',
  standalone: true,
  // importaciones de componentenes a usar aqui en el componente principal
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
// clase
export class AppComponent {
  title = 'signal-store';
}
