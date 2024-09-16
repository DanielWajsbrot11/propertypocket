import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxInfiniteScrollComponent } from './components/ngx-infinite-scroll/ngx-infinite-scroll.component';
import { authGuard } from './auth.guard';

// The following site shows authentication and routing
// https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc

const routes: Routes = [
  {
    path: 'home',
    component: NgxInfiniteScrollComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
