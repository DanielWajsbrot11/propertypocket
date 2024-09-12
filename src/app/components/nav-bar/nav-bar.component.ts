import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

// The following site shows authentication
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc

export class NavBarComponent {
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(public angularFireAuth: AngularFireAuth) {
  }
  
  logOut() {
    this.angularFireAuth.signOut();
  }

  onClick(){
    const navbar = document.querySelector('nav');
  }

}
