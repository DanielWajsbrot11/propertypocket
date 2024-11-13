import { Component, Input } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Subscription } from 'rxjs';
import { SavesRetrieval } from '../../services/savesRetrieval.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'] 
})
export class PropertyCardComponent {
  @Input() listing: any;
  isModalOpen:boolean = false;

  constructor(private backendService: BackendService, private savesRetrieval: SavesRetrieval,
     public angularFireAuth: AngularFireAuth, private apiSerice: ApiService) {}

  liked = false;
  numLikes: number = 0
  bookmarked = false;
  imgClicked = false;
  leftIndex = 0;
  currentIndex = 1
  rightIndex = 2;

  comments: any = []
  comment: string = ""     // comment structure and logic copied from navbar.html and ts files. See reference there. 

  singlePropertyData: any | null = null

  private savesSubmissionSubscription: Subscription | null = null;


  // Chat GPT for understanding concepts here.
  advanceLeft() {
    if (this.leftIndex === 0){
      this.leftIndex = this.singlePropertyData.responsivePhotos.length - 1;
    }
    else {
      this.leftIndex--;
    }

    if (this.currentIndex === 0){
      this.currentIndex = this.singlePropertyData.responsivePhotos.length - 1;
    }
    else {
      this.currentIndex--;
    }

    if (this.rightIndex === 0){
      this.rightIndex = this.singlePropertyData.responsivePhotos.length - 1;
    
    }
    else {
      this.rightIndex--;
    }
  }

  advanceRight() {
    if (this.leftIndex === (this.singlePropertyData.responsivePhotos.length - 1)) {
      this.leftIndex = 0
    } else {
      this.leftIndex++;
    }

    if (this.currentIndex === (this.singlePropertyData.responsivePhotos.length - 1)) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }

    if (this.rightIndex === (this.singlePropertyData.responsivePhotos.length - 1)) {
      this.rightIndex = 0;
    } else {
      this.rightIndex++;
    }
  }

  async getPropertyCardImage(){
    this.singlePropertyData = await this.apiSerice.returnSingleProperty(this.listing.zpid);
    console.log(this.listing.zpid);
    console.log(`The length of the photo gallery is ${this.singlePropertyData.responsivePhotos.length}`)
    this.imgClicked = true;
    console.log(this.listing.zpid);

    // Chat-GPT for rounding and complex ternary formatting for lotareavalue and lotareaunits.
    alert(`Date Posted: ${this.singlePropertyData.datePostedString ? this.singlePropertyData.datePostedString : 'N/A'}\nYear Built: ${this.singlePropertyData.yearBuilt ? this.singlePropertyData.yearBuilt : 'N/A'}\nTaxes: $${this.singlePropertyData.resoFacts.taxAnnualAmount ? Math.round(this.singlePropertyData.resoFacts.taxAnnualAmount) : 'N/A'}\nLot size: ${this.singlePropertyData.lotAreaValue && this.singlePropertyData.lotAreaUnits ? `${Number(this.singlePropertyData.lotAreaValue).toFixed(3)} ${this.singlePropertyData.lotAreaUnits}` : 'N/A'}\nHOA: ${this.singlePropertyData.resoFacts.hoaFeeTotal ? this.singlePropertyData.resoFacts.hoaFeeTotal : 'N/A'}\nInsurance: $${this.singlePropertyData.annualHomeownersInsurance ? Math.round(this.singlePropertyData.annualHomeownersInsurance) : 'N/A'}\n\nAgent Name: ${this.singlePropertyData.attributionInfo.agentName ? this.singlePropertyData.attributionInfo.agentName : 'N/A'}\nAgent Email: ${this.singlePropertyData.attributionInfo.agentEmail ? this.singlePropertyData.attributionInfo.agenetEmail : 'N/A'}\nAgent Phone Number: ${this.singlePropertyData.attributionInfo.agentPhoneNumber ? this.singlePropertyData.attributionInfo.agentPhoneNumber : 'N\A'}\n\nDescription:\n${this.singlePropertyData.description}`);
  }

// Init and destroy logic taken from infinite scroll component. Same thing for subscription logic. See reference there.
// Chat-GPT for debugging. 
  async ngOnInit() {

    this.numLikes = await this.backendService.getNumLikes(this.listing.zpid);
    
    const user = await this.angularFireAuth.currentUser;

    if (user) {
    
      this.savesSubmissionSubscription = this.savesRetrieval.savesObj.subscribe({
          next: (response: any)=>{
            const bookmarks = response["bookmarks"];
            const likes = response["likes"];

            // Chat-GPT for some function
            if (bookmarks.some((item: any) => item.zpid === this.listing.zpid)) {
              this.bookmarked = true;
            }

            if (likes.some((item: any) => item.zpid === this.listing.zpid)) {
              this.liked = true;
            }
        },
          error: (err: any)=>console.log(err),
        });

    }

    this.onGetListingCommentsClick();


  }

  ngOnDestroy(){
    if (this.savesSubmissionSubscription) {
      this.savesSubmissionSubscription.unsubscribe();
    }
  }

  

  onBookmarkClick() {
    
    this.bookmarked = !this.bookmarked;
    
    if (this.bookmarked) {
      console.log("Bookmarked");
      if (this.listing && this.listing.zpid) {
        this.backendService.makeBookmark(this.listing.zpid)
          .then(() => {
            console.log('Bookmark added successfully!');
          })
          .catch((error) => {
            console.error('Error storing bookmark:', error);
            this.bookmarked = !this.bookmarked;
          });
      } else {
        console.error('ZPID is not available');
      }
    }
    else {
      console.log("Unbookmarked");
      if (this.listing.zpid) {
        this.backendService.deleteBookmark(this.listing.zpid)
          .then(() => {
            console.log('Bookmark Removed!');
          })
          .catch((error) => {
            console.error('Error deleting:', error);
            this.bookmarked = !this.bookmarked;
          });
      } else {
        console.error('ZPID is not available');
      }
    }
  }

  onLikeClick() {
  
    this.liked = !this.liked;

    if (this.liked) {
      console.log("Liked");
      if (this.listing.zpid) {
        this.backendService.makeLike(this.listing.zpid)
          .then(() => {
            console.log('Like added successfully!');
            this.numLikes++;
          })
          .catch((error) => {
            console.error('Error storing like:', error);
            this.liked = !this.liked;
          });
      } else {
        console.error('ZPID is not available');
      }
    }
    else {
      console.log("Unliked"); 
      if (this.listing.zpid) {
        this.backendService.deleteLike(this.listing.zpid)
          .then(() => {
            console.log('Like Removed!');
            this.numLikes--;
          })
          .catch((error) => {
            console.error('Error deleting:', error);
            this.liked = !this.liked;
          });
      } else {
        console.error('ZPID is not available');
      }
    }
  }

  toggleModal(){
    this.isModalOpen = !this.isModalOpen;
  }

  // need test

  async onCommentClick() {
    if (this.listing.zpid) {

      if (this.comment !== "") {
          this.backendService.makeComment(this.listing.zpid, this.comment)        // According to Chat-GPT, we don't need to await because .then. Same for other comment function below.
          .then(async () => {
            console.log('Comment added successfully!');

            let user = await this.angularFireAuth.currentUser;

            let newComment = {
                comment: this.comment,
                time: new Date(),                // Confirmed with Chat-GPT this is for the current date right now.
                name: user?.displayName
              };

            this.comments.unshift(newComment);        // Chat-GPT for unshift function.
          })
          .catch((error) => {
            console.error('Error storing comment:', error);
          });
      } else {
        console.error('ZPID is not available');
      }
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

  async onGetListingCommentsClick() {
    if (this.listing.zpid) {
        this.backendService.getZPIDComments(this.listing.zpid)
        .then((comments) => {
          this.comments = comments.map((comment: any) => ({
            ...comment,
            time: new Date(comment.time.seconds * 1000 + comment.time.nanoseconds / 1_000_000)
          }));
        })
        .catch((error) => {
          console.error('Error deleting:', error);
        });
    } else {
      console.error('ZPID is not available');
    }
  }

}
