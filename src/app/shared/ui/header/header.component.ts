import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// selector
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styles: ``
})
// clase
export class HeaderComponent {

}
