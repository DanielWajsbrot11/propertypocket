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
  loaded = false;

  leftIndex = 0;
  currentIndex = 1;
  rightIndex = 2;

  imgClicked = false;

  toggleLoading = () => {this.isLoading = !this.isLoading}


  async ngOnInit(): Promise<void> {

    this.toggleLoading();

    // Code structure below copied from navbar file. See references there.


    // We wait to allow enough time for currentUser to be returned. Chat-GPT helped me realize this was the issue.
    // Timeout copied from api service file. See reference there.
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = await this.angularFireAuth.currentUser;

    console.log(user);
    
    if (user) {
      let bookmarks = await this.backendService.getBookmarks();
      let likes = await this.backendService.getLikes();

      const savesObj = {
        "bookmarks": bookmarks,
        "likes": likes
      };

      this.savesRetrieval.updateSaves(savesObj);

      
      if (bookmarks && bookmarks.length > 0) {
        // Loop through returned bookmarks and get zpids
        for (let bookmark of bookmarks) {
          const zpid = bookmark.zpid;

          // For each zpid, call this.apiService.returnSingleProperty and get necessary data.
          const propertyData = await this.apiService.returnSingleProperty(zpid);

          // Add data to this.items
          this.items.push(propertyData);
        }
      }

      console.log(this.items);
  }


    this.toggleLoading();
    this.loaded = true;

    
  }

  async showBookmarkedPropertyDetails(item: any) {
    const singlePropertyData = await this.apiService.returnSingleProperty(item.zpid);
    console.log(item.zpid);
    console.log(`The length of the photo gallery is ${singlePropertyData.responsivePhotos.length}`);
    this.imgClicked = true;
    console.log(item.zpid);

    alert(`Date Posted: ${singlePropertyData.datePostedString ? singlePropertyData.datePostedString : 'N/A'}
Year Built: ${singlePropertyData.yearBuilt ? singlePropertyData.yearBuilt : 'N/A'}
Taxes: $${singlePropertyData.resoFacts.taxAnnualAmount ? Math.round(singlePropertyData.resoFacts.taxAnnualAmount) : 'N/A'}
Lot size: ${singlePropertyData.lotAreaValue && singlePropertyData.lotAreaUnits ? `${Math.round(singlePropertyData.lotAreaValue)} ${singlePropertyData.lotAreaUnits}` : 'N/A'}
HOA: ${singlePropertyData.resoFacts.hoaFeeTotal ? singlePropertyData.resoFacts.hoaFeeTotal : 'N/A'}
Insurance: $${singlePropertyData.annualHomeownersInsurance ? Math.round(singlePropertyData.annualHomeownersInsurance) : 'N/A'}

Agent Name: ${singlePropertyData.attributionInfo.agentName ? singlePropertyData.attributionInfo.agentName : 'N/A'}
Agent Email: ${singlePropertyData.attributionInfo.agentEmail ? singlePropertyData.attributionInfo.agentEmail : 'N/A'}
Agent Phone Number: ${singlePropertyData.attributionInfo.agentPhoneNumber ? singlePropertyData.attributionInfo.agentPhoneNumber : 'N/A'}

Description:
${singlePropertyData.description}`);
  }


  ngOnDestroy() {}


  constructor(
    private paginationService:PaginationDummyService, private backendService: BackendService,
    private angularFireAuth: AngularFireAuth, private apiService: ApiService, private savesRetrieval: SavesRetrieval
  ){}


advanceRight() {
  if (this.leftIndex === 0){
    this.leftIndex = this.items.length - 1;
  }
  else {
    this.leftIndex--;
  }

  if (this.currentIndex === 0){
    this.currentIndex = this.items.length - 1;
  }
  else {
    this.currentIndex--;
  }

  if (this.rightIndex === 0){
    this.rightIndex = this.items.length - 1;
  
  }
  else {
    this.rightIndex--;
  }
}

advanceLeft() {
  if (this.leftIndex === 0) {
    this.leftIndex = this.items.length - 1;
  } else {
    this.leftIndex--;
  }

  if (this.currentIndex === 0) {
    this.currentIndex = this.items.length - 1;
  } else {
    this.currentIndex--;
  }

  if (this.rightIndex === 0) {
    this.rightIndex = this.items.length - 1;
  } else {
    this.rightIndex--;
  }
}



}
