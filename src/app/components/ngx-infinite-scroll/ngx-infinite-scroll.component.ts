import { Component, OnInit } from '@angular/core';
import { PaginationDummyService } from '../../services/pagination-dummy.service';
import { BackendService } from "../../services/backend.service";
import { ZipRetrieval } from '../../services/zipRetrieval.service';
import { from, Subscription, switchMap, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


// Infinite Scroll and append data and onScroll copied and pasted from the following links:
// https://www.youtube.com/watch?v=3IFyMCWziq4
// https://github.com/rd003/angular-23


@Component({
  selector: 'app-ngx-infinite-scroll',
  templateUrl: './ngx-infinite-scroll.component.html',
  styleUrls: ['./ngx-infinite-scroll.component.scss']
})
export class NgxInfiniteScrollComponent implements OnInit {
  
  items: any[] = [];
  isLoading=false;
  currentPage=1;
  itemsPerPage=10;
  zip = "";
  private zipSubmissionSubscription: Subscription | null = null; // Chat-GPT

  toggleLoading = () => {this.isLoading = !this.isLoading}


  // Chat-GPT for handling state managemnt with zip. Also, used for debugging.
  async ngOnInit(): Promise<void> {

    this.zipRetrieval.zipValue.subscribe((zip) => this.zip = zip);

    this.zipSubmissionSubscription = this.zipRetrieval.zipSubmitted.pipe(
      tap(() => this.toggleLoading()),  // Chat-GPT for tap and loading logic here and in complete.

      switchMap(() => {

        this.paginationService.setZipCode(this.zip);
        
        return from(this.paginationService.callZillowAPI()).pipe(
          switchMap(() => {
            return this.paginationService.getItems(this.currentPage, this.itemsPerPage);
          })
        );
      })
      ).subscribe({
        next: (response: any)=>{this.items = response; 
          this.toggleLoading();
      },
        error: (err: any)=>console.log(err),
      });
  }

  async appendData(): Promise<void> {
    this.toggleLoading();
    this.paginationService.getItems(this.currentPage, this.itemsPerPage).subscribe({
      next:response=>this.items = [...this.items,...response],
      error:err=>console.log(err),
      complete:() => this.toggleLoading()
    })
  }

  onScroll = ()=>{
    this.currentPage++;
    this.appendData();
  }

  // Chat-GPT
  ngOnDestroy() {

    if (this.zipSubmissionSubscription) {
      this.zipSubmissionSubscription.unsubscribe();
    }

  }


  constructor(private paginationService:PaginationDummyService, private backendService: BackendService,
    private zipRetrieval: ZipRetrieval, private angularFireAuth: AngularFireAuth){}
}
