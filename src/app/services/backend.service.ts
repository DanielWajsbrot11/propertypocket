import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";


// The following site shows authentication
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc

@Injectable({
  providedIn: "root",
})
export class BackendService {
  // backend url that returns the firebase user id of the current user
  userIdUrl = `${environment.backendUrl}/userid`;
  constructor(private http: HttpClient) {}
  getUserId(): Observable<any> {
    return this.http.get(this.userIdUrl);
  }
}