import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";


@Component({
  selector: 'app-wildcard',
  templateUrl: './wildcard.component.html',
  styleUrl: './wildcard.component.css',
  standalone: true,
  imports: [NavBarComponent]
})
export class WildcardComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']); // Redirects to the homepage
  }
}
