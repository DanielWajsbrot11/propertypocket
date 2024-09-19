import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ZipRetrieval } from '../../services/zipRetrieval.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent {

  zip: string = "";
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Chat-GPT for handling keyboard enter event and service call with state managemnt.
  submitZip(){
    this.zipRetrieval.updateZip(this.zip);
  }
  
  logOut() {
    this.angularFireAuth.signOut();
  }

  onClick(){
    const navbar = document.querySelector('nav');
  }

  // The following site shows authentication with signing out. 
  // https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc
  constructor(public angularFireAuth: AngularFireAuth, private zipRetrieval: ZipRetrieval) {}

}
