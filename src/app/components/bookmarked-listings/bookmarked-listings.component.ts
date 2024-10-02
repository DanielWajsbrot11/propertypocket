import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-bookmarked-listings',
  templateUrl: './bookmarked-listings.component.html',
  styleUrls: ['./bookmarked-listings.component.scss']
})
export class BookmarkedListingsComponent {

  bookmarks: any[] = []; 
  likes: any[] = []; 

  constructor(private backendService: BackendService) {}

  logBookmarkedZPIDs() {
    this.backendService.getBookmarks().then(bookmarks => {
      if (bookmarks) {
        this.bookmarks = bookmarks; 
        const zpids = this.bookmarks.map(bookmark => bookmark.zpid);
        console.log('ZPIDs (Bookmarks):', zpids);
      } else {
        console.log('No bookmarks found');
      }
    }).catch(error => {
      console.error('Error fetching bookmarks:', error);
    });
  }

  logLikedZPIDs() {
    this.backendService.getLikes().then(likes => {
      if (likes) {
        this.likes = likes;
        const zpids = this.likes.map(like => like.zpid);
        console.log('ZPIDs (Likes):', zpids);
      } else {
        console.log('No likes found');
      }
    }).catch(error => {
      console.error('Error fetching likes:', error);
    });
  }
}
