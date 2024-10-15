import { Component, OnInit } from '@angular/core';
import { PaginationDummyService } from '../../services/pagination-dummy.service';
import { BackendService } from "../../services/backend.service";
import { ZipRetrieval } from '../../services/zipRetrieval.service';
import { from, Subscription, switchMap, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from '../../services/api.service';

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

    // 1. Get bookmarks code and update saves retrieval from navbar ts file

    // 2. Get zpids from user bookmarks

    // 3. Loop through zpids and call this.apiService.returnSingleProperty and get necessary data.

    // 4. Add data to this.items

    
  }


  ngOnDestroy() {}


  constructor(private paginationService:PaginationDummyService, private backendService: BackendService,
    private angularFireAuth: AngularFireAuth, private apiService: ApiService){}

 
}
