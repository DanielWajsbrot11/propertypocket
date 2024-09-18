

// Chat-GPT showed the following code and how to set up backend Express server to retrieve our secret keys.
// You can't use node modules to load in keys in Angular according to Chat-GPT and
// https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility.

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})

export class SecretsService {

    constructor (private http: HttpClient) {}


    getSecrets(): Observable<any>{
        return this.http.get("https://us-central1-property-pocket.cloudfunctions.net/api/gatherConfig")
    }
}