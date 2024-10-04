import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ZipRetrieval } from '../../services/zipRetrieval.service';
import { SavesRetrieval } from '../../services/savesRetrieval.service';
import { BackendService } from '../../services/backend.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent {

  zip: string = "";
  username: string | null = "Sign in";
  showZip: string = "block";
  
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async ngOnInit() {

    // Chat-GPT for getting current url.
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/saved') {
          this.showZip = "hidden";
        }
      });

    // Chat-GPT for accessing user and name.
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.username = user.displayName;
      }
    });

  }

  // Chat-GPT for handling keyboard enter event and service call with state managemnt.
  // State manangement with likes and bookmarks copies same logic from zipRetrieval service in infinite scroll. See reference there.
  async submitZip(){

    this.zipRetrieval.updateZip(this.zip);

    const user = await this.angularFireAuth.currentUser;

    if (user) {

      let bookmarks = await this.backendService.getBookmarks();
      let likes = await this.backendService.getLikes();

      const savesObj = {
        "bookmarks" : bookmarks,
        "likes" : likes
      };

      this.savesRetrieval.updateSaves(savesObj);

    }

  }
  
  logoutUser() {
    location.reload();        // Chat-GPT
    this.angularFireAuth.signOut();
  }

  onClick(){
    const navbar = document.querySelector('nav');
  }

  // The following site shows authentication with signing out. 
  // https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc
  constructor(public angularFireAuth: AngularFireAuth, private zipRetrieval: ZipRetrieval, 
    private savesRetrieval: SavesRetrieval, private backendService: BackendService, private router: Router
  ) {}

}
