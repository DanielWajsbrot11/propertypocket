import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

type listingType = {
  "name": string,
  "price": number
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {


  constructor() { }

  returnData(): listingType[] {

    const listings = [
      {
        "name" : "Property 1",
        "price" : 100000
      },
      {
        "name" : "Property 2",
        "price" : 500000
      },
      {
        "name" : "Property 3",
        "price" : 500000
      },
      {
        "name" : "Property 4",
        "price" : 500000
      },
      {
        "name" : "Property 5",
        "price" : 500000
      },
      {
        "name" : "Property 6",
        "price" : 500000
      },
      {
        "name" : "Property 7",
        "price" : 500000
      },
      {
        "name" : "Property 8",
        "price" : 500000
      },
      {
        "name" : "Property 9",
        "price" : 500000
      },
      {
        "name" : "Property 10",
        "price" : 500000
      },
      {
        "name" : "Property 11",
        "price" : 500000
      },
      {
        "name" : "Property 12",
        "price" : 5000001
      }
    ]

    return listings;

  }
}
