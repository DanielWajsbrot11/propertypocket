
// This file contains the Firebase configuration object, which is used in development according to Chat-GPT.
// Chat-GPT also said to have initial default values which will be changed based upon the secrets
// returned from our Express server in app.module during intialization.
// It also explained the backendurl variable.

// The following site shows authentication. Also, Firebase console settings shows the following code.
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc

export const environment =  {
    production: false,
    backendUrl: "http://localhost:4200/",
    firebaseConfig:{}
};
