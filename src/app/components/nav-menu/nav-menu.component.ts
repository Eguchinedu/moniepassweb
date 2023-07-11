import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isMenuRequired = false;
  constructor(private router: Router, private auth: AuthService) {}
  ngOnInit(): void {}

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
  signOut() {
    this.auth.signOut();
  }
}
