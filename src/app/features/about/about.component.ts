import { Component } from '@angular/core';
import { NavBarComponent} from '../../shared/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
@Component({
  selector: 'app-about',
  standalone:true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
