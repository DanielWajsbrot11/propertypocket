import { Injectable } from '@angular/core';
import { delay, Observable, of} from 'rxjs';
import { BackendService } from './backend.service';

type card = {
  "name": string,
  "price": number,
  "zpid": string
}

@Injectable({
  providedIn: 'root'
})

// Some of the Infinite Scroll copied from the following links:
// https://www.youtube.com/watch?v=3IFyMCWziq4
// https://github.com/rd003/angular-23

export class PaginationDummyService {

  private totalItems=1000;
  private data: card[] = [];

  getItems(page=1,itemsPerPage=10):Observable<card[]>{

   const startIndex=(page-1)*itemsPerPage;
   const endIndex=startIndex+itemsPerPage;

   let items: card[] = []; 

   // Move items from data to temp array and return temp array.
   for(let i=startIndex;i<endIndex;i++){
    if(i<this.totalItems)
      items.push(this.data[i]);
   }
   
   return of(items).pipe(delay(500));
  }

  // Load the data in the constructor, so api calls aren't made repeatedly.
  constructor(private backendService: BackendService) {

    this.backendService.returnData().map((listing) => {
      this.data.push(listing);
   })
   this.totalItems = this.data.length;
  }
}