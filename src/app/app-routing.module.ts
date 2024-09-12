import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxInfiniteScrollComponent } from './components/ngx-infinite-scroll/ngx-infinite-scroll.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: NgxInfiniteScrollComponent,
    canActivate: [authGuard],
  },
];

// The following site shows authentication
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
