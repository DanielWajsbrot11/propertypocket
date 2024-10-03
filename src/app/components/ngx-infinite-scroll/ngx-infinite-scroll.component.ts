import { Component, OnInit } from '@angular/core';
import { PaginationDummyService } from '../../services/pagination-dummy.service';
import { BackendService } from "../../services/backend.service";
import { ZipRetrieval } from '../../services/zipRetrieval.service';
import { from, Subscription, switchMap, tap } from 'rxjs';

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
  private submissionSubscription: Subscription | null = null; // Chat-GPT

  toggleLoading = () => {this.isLoading = !this.isLoading}

  getUserId() {
    console.log("loading request...")
    this.backendService.getUserId().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  // Chat-GPT for handling state managemnt with zip. Also, used for debugging.
  async ngOnInit(): Promise<void> {

    this.zipRetrieval.zipValue.subscribe((zip) => this.zip = zip);

    this.submissionSubscription = this.zipRetrieval.zipSubmitted.pipe(
      tap(() => this.toggleLoading()),  // Chat-GPT for tap and loading logic here and in complete.

      switchMap(() => {

        this.paginationService.setZipCode(this.zip);
        
        return from(this.paginationService.callZillowAPI()).pipe(
          switchMap(() => {
            console.log(this.isLoading);
            return this.paginationService.getItems(this.currentPage, this.itemsPerPage);
          })
        );
      })
      ).subscribe({
        next: (response: any)=>{this.items = response; 
          console.log(`response is`); 
          console.table(this.items); 
          console.log(this.paginationService.getZip());
          this.toggleLoading();
          console.log(this.isLoading);
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

    if (this.submissionSubscription) {
      this.submissionSubscription.unsubscribe();
    }
  }



  constructor(private paginationService:PaginationDummyService, private backendService: BackendService,
    private zipRetrieval: ZipRetrieval ){}
}
