import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

type Card = {
  name: string;
  price: number;
  zpid: string;
}

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']  
})
export class PropertyCardComponent {
  @Input() listing: Card = { name: "", price: 0, zpid: "" };

  constructor(private apiService: ApiService) {}

  onBookmarkClick() {
    if (this.listing.zpid) {
      this.apiService.makeBookmark(this.listing.zpid)
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
      this.apiService.makeLike(this.listing.zpid)
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
  
}
