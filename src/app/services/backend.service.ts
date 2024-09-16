import { Injectable } from '@angular/core';

type listingType = {
  "name": string,
  "price": number,
  "zpid": string
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {


  constructor() { }

  returnData(): listingType[] {
    // added test zpid to first couple properties
    const listings = [
      {
        "name" : "Property 1",
        "price" : 100000,
        "zpid" : "Test"
      },
      {
        "name" : "Property 2",
        "price" : 500000,
        "zpid" : "Test1"
      },
      {
        "name" : "Property 3",
        "price" : 500000,
        "zpid" : "Test2"
      },
      {
        "name" : "Property 4",
        "price" : 500000,
        "zpid" : "Hold"
      },
      {
        "name" : "Property 5",
        "price" : 500000,
        "zpid" : "Hold"
      },
      {
        "name" : "Property 6",
        "price" : 500000,
        "zpid" : "Hold"
      },
      {
        "name" : "Property 7",
        "price" : 500000,
        "zpid" : "Hold"
      },
      {
        "name" : "Property 8",
        "price" : 500000,
        "zpid" : "Hold"
      },
      {
        "name" : "Property 9",
        "price" : 500000,
        "zpid" : "Hold"
      },
      {
        "name" : "Property 10",
        "price" : 500000,
        "zpid" : "Hold"
      },
      {
        "name" : "Property 11",
        "price" : 500000,
        "zpid" : "Hold"
      },
      {
        "name" : "Property 12",
        "price" : 5000001,
        "zpid" : "Hold"
      }
    ]

    return listings;

  }
}
