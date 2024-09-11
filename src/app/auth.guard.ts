import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

export const authGuard: CanActivateFn = async (route, state) => {
  const angularFireAuth = inject(AngularFireAuth);
  const user = await angularFireAuth.currentUser;
  const isLoggedIn = !!user;
  if(!isLoggedIn){
    alert("Login to view the home page!")
  }
  return isLoggedIn;
};