import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxInfiniteScrollComponent } from './components/ngx-infinite-scroll/ngx-infinite-scroll.component';
import { BookmarkedListingsComponent } from './components/bookmarked-listings/bookmarked-listings.component'
import { authGuard } from './auth.guard';

// The following site shows authentication and routing
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc

const routes: Routes = [
  {
    path: "",
    component: NgxInfiniteScrollComponent,
  },
  {
    path: "bookmarked",
    component: BookmarkedListingsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
