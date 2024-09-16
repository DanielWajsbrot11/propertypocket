//google-sso.directive.ts
import { Directive, HostListener } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@firebase/auth";

// The following site shows authentication. Also, Firebase Gemini helped with debugging.
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc

@Directive({
  selector: "[googleSso]",
})
export class GoogleSsoDirective {
  constructor(private angularFireAuth: AngularFireAuth) {}
  @HostListener("click")
  async onClick() {
    console.log("Auth clicked");
    const creds = await this.angularFireAuth.signInWithPopup(
      new GoogleAuthProvider(),
    );
    // do what you want with the credentials, for ex adding them to firestore...
  }
}
