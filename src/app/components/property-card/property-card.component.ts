import { Component, Input } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'] 
})
export class PropertyCardComponent {
  @Input() listing: any;

  constructor(private backendService: BackendService) {}

  onBookmarkClick() {
    console.log(this.listing);
    if (this.listing && this.listing.zpid) {
      this.backendService.makeBookmark(this.listing.zpid)
        .then(() => {
          console.log('Bookmark added successfully!');
        })
        .catch((error) => {
          console.error('Error storing bookmark:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

  onLikeClick() {
    if (this.listing.zpid) {
      this.backendService.makeLike(this.listing.zpid)
        .then(() => {
          console.log('Like added successfully!');
        })
        .catch((error) => {
          console.error('Error storing like:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

  // need test

  onCommentClick() {
    if (this.listing.zpid) {
      this.backendService.makeComment(this.listing.zpid, "TEST COMMENT")
        .then(() => {
          console.log('Comment added successfully!');
        })
        .catch((error) => {
          console.error('Error storing comment:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

  onUnmarkClick() {
    if (this.listing.zpid) {
      this.backendService.deleteBookmark(this.listing.zpid)
        .then(() => {
          console.log('Bookmark Removed!');
        })
        .catch((error) => {
          console.error('Error deleting:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

  onUnlikeClick() {
    if (this.listing.zpid) {
      this.backendService.deleteLike(this.listing.zpid)
        .then(() => {
          console.log('Like Removed!');
        })
        .catch((error) => {
          console.error('Error deleting:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

  // need testing
  onDeleteCommentClick() {
    if (this.listing.zpid) {
      this.backendService.deleteComment(this.listing.zpid, "TEST COMMENT")
        .then(() => {
          console.log('Comment Removed!');
        })
        .catch((error) => {
          console.error('Error deleting:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

  onGetMarksClick() {
    if (this.listing.zpid) {
      this.backendService.getBookmarks()
        .then(() => {
          console.log('Bookmarks Retrieved!');
        })
        .catch((error) => {
          console.error('Error deleting:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

  onGetLikesClick() {
    if (this.listing.zpid) {
      this.backendService.getLikes()
        .then(() => {
          console.log('Likes Retrieved!');
        })
        .catch((error) => {
          console.error('Error deleting:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

  // need testing

  onGetUserCommentsClick() {
    if (this.listing.zpid) {
      this.backendService.getUserComments(this.listing.zpid)
        .then(() => {
          console.log('Comments Retrieved!');
        })
        .catch((error) => {
          console.error('Error deleting:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

  onGetListingCommentsClick() {
    if (this.listing.zpid) {
      this.backendService.getZPIDComments(this.listing.zpid)
        .then(() => {
          console.log('Comments Retrieved!');
        })
        .catch((error) => {
          console.error('Error deleting:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

}
