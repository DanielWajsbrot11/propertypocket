import { Component } from '@angular/core';
import { PaginationDummyService } from '../../services/pagination-dummy.service';
import { BackendService } from "../../services/backend.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from '../../services/api.service';
import { SavesRetrieval } from '../../services/savesRetrieval.service';

// This file is just a copy and paste of our infinite-scroll-ts file so see references there.

@Component({
  selector: 'app-bookmarked-listings',
  templateUrl: './bookmarked-listings.component.html',
  styleUrls: ['./bookmarked-listings.component.scss']
})
export class BookmarkedListingsComponent {

  items: any[] = [];
  isLoading=false;

  toggleLoading = () => {this.isLoading = !this.isLoading}


  async ngOnInit(): Promise<void> {

    this.toggleLoading();

    // Code copied from navbar file. See references there.
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

    // 3. Loop through returned bookmarks and get zpids

    // 4. For each zpid, call this.apiService.returnSingleProperty and get necessary data.

    // 5. Add data to this.items

    this.toggleLoading();

    
  }


  ngOnDestroy() {}


  constructor(private paginationService:PaginationDummyService, private backendService: BackendService,
    private angularFireAuth: AngularFireAuth, private apiService: ApiService, private savesRetrieval: SavesRetrieval){}

 
}
