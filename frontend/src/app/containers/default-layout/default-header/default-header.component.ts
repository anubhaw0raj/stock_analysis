import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent extends HeaderComponent {
  // Track mobile navigation visibility
  mobileNavVisible = false;

  constructor(private classToggler: ClassToggleService) {
    super();
  }

  // Toggle mobile navigation menu
  toggleMobileNav() {
    this.mobileNavVisible = !this.mobileNavVisible;
  }
}
