import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  items: MenuItem[] = [
    { 
      label: 'Bookmarked Listings', 
      items: [ 
        { 
          label: 'HTML 1'
        }, 
        { 
          label: 'HTML 2'
        } 
      ] 
    }, 
  ]
  
  constructor(public angularFireAuth: AngularFireAuth) {
  }
  logOut() {
    this.angularFireAuth.signOut();
  }

  onClick(){
    const navbar = document.querySelector('nav');
  }

}
