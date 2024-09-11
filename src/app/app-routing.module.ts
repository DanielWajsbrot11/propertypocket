import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxInfiniteScrollComponent } from './components/ngx-infinite-scroll/ngx-infinite-scroll.component';
import { LandingComponent } from './components/landing/landing.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:"/", component: LandingComponent},
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
