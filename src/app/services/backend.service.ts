
// Chat-GPT also showed how to access the secret key variables stored in Firebase functions.
// Other sites like https://www.reddit.com/r/angular/comments/vkmg4c/hiding_api_key_in_angular_web_app/
// recommend not storing keys inside Angular itself. 


import { Injectable } from '@angular/core';
import { SecretsService } from './secrets.service';
import { lastValueFrom } from 'rxjs';


// API calls copied and pasted from Rapid API Zillow API code snippet
// https://rapidapi.com/s.mahmoud97/api/zillow56/playground/apiendpoint_444379e9-126c-4fd2-b584-1c9c355e3d8f
// https://rapidapi.com/s.mahmoud97/api/zillow56/playground/apiendpoint_574a8e83-d743-4353-833f-be1731a63081



@Injectable({
  providedIn: 'root'
})
export class BackendService {


  constructor(private secretsService: SecretsService) {}


  async returnListings(zipcode: string): Promise<any[]> {

    let options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '',
        'x-rapidapi-host': 'zillow56.p.rapidapi.com'
      }
    };

    // Chat-GPT for debugging and shows lastValueFrom. Debugging in Chat-GPT code based upon subscribe code 
    // copied over from infinite-scroll-component code
    const secrets = await lastValueFrom(this.secretsService.getSecrets());
    options.headers['x-rapidapi-key'] = secrets["zillowkey"];

    const propertyListUrl = `https://zillow56.p.rapidapi.com/search?location=${zipcode}&page=1&output=json&status=forSale&sortSelection=priorityscore&listing_type=by_agent&doz=any`;

    let allProperties: any[] = [];
    
    try {

      const response = await fetch(propertyListUrl, options);
      const result = await response.json()
      const properties = result.results;

      for (let i = 0; i < properties.length; i++)
            allProperties.push(properties[i]);

      let pages: number = result.totalPages;

      for (let page = 2; page <= pages; page++) {

        // Chat-GPT for sleep timer
        await new Promise(resolve => setTimeout(resolve, 1500));

        const propertyListUrl = `https://zillow56.p.rapidapi.com/search?location=${zipcode}&page=${page}&output=json&status=forSale&sortSelection=priorityscore&listing_type=by_agent&doz=any`;

        const response = await fetch(propertyListUrl, options);
        const result = await response.json()
        const properties = result.results;

        for (let i = 0; i < properties.length; i++)
            allProperties.push(properties[i]);

      }

      return allProperties;
      

  } catch (error) {
      console.error(error);
      return [];
  }

}


  async returnSingleProperty(zpid: string): Promise<any> {

    let options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '',
        'x-rapidapi-host': 'zillow56.p.rapidapi.com'
      }
    };

    // Chat-GPT for debugging and shows lastValueFrom. Debugging in Chat-GPT code based upon subscribe code 
    // copied over from infinite-scroll-component code
    const secrets = await lastValueFrom(this.secretsService.getSecrets());
    options.headers['x-rapidapi-key'] = secrets["zillowkey"];


    const singlePropertyURL = `https://zillow56.p.rapidapi.com/propertyV2?zpid=${zpid}`;

    try {

      const response = await fetch(singlePropertyURL, options);
      const result = await response.json();
      return result;

    } catch (error) {
        console.error(error);
        return null;
    }

  }

}
