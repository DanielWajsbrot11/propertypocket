import { Injectable } from '@angular/core';
import { delay, of, Observable} from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

// Some of the Infinite Scroll copied from the following links:
// https://www.youtube.com/watch?v=3IFyMCWziq4
// https://github.com/rd003/angular-23

export class PaginationDummyService {

 
  private data: any[] = [];
  private zipcode = "";

  // Chat-GPT for debugging and for understanding Promise versus Observable.
  getItems(page=1,itemsPerPage=10): Observable<any[]>{
  
   const startIndex=(page-1)*itemsPerPage;
   const endIndex=startIndex+itemsPerPage;

   let items: any[] = []; 

   // Move items from data to temp array and return temp array.
   for(let i=startIndex;i<endIndex;i++){
    if(i<this.data.length)
      items.push(this.data[i]);
   }
   
   return of(items).pipe(delay(500));
  }

  async callZillowAPI() : Promise<void>{
    this.data = await this.apiService.returnListings(this.zipcode);
  }

  // Chat-GPT suggested a setter function for changing a parameter instead of a constructor.
  setZipCode(zipcode: string) {this.zipcode = zipcode};
  getZip(){return this.zipcode};

  // Load the data in the constructor, so api calls aren't made repeatedly.
  constructor(private apiService: ApiService) {}
}