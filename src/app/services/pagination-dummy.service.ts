import { Injectable } from '@angular/core';
import { delay, Observable, of} from 'rxjs';
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})

// Some of the Infinite Scroll copied from the following links:
// https://www.youtube.com/watch?v=3IFyMCWziq4
// https://github.com/rd003/angular-23

export class PaginationDummyService {

 
  private data: any[] = [];
  private zipcode = "";

  async getItems(page=1,itemsPerPage=10):Promise<Observable<any[]>>{

    // Only make api call if data hasn't been loaded yet, aka on initialization.
    // Chat-GPT for debugging.
    if (this.data.length === 0) {
      this.data = await this.backendService.returnListings(this.zipcode);
    }

   const startIndex=(page-1)*itemsPerPage;
   const endIndex=startIndex+itemsPerPage;

   let items: any[] = []; 

   // Move items from data to temp array and return temp array.
   for(let i=startIndex;i<endIndex;i++){
    if(i<this.data.length)
      items.push(this.data[i]);
   }
   
   console.log(`Response is returning ${items.length}`)
   return of(items).pipe(delay(500));
  }

  // Chat-GPT suggested a setter function for changing a parameter instead of a constructor.
  setZipCode(zipcode: string) {this.zipcode = zipcode};

  // Load the data in the constructor, so api calls aren't made repeatedly.
  constructor(private backendService: BackendService) {}
}