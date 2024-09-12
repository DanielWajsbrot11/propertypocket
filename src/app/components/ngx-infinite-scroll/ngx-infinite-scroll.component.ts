import { Component, OnInit } from '@angular/core';
import { PaginationDummyService } from '../../services/pagination-dummy.service';
import { ApiService } from "../../api/api.service";


// Infinite Scroll copied and pasted from the following links:
// https://www.youtube.com/watch?v=3IFyMCWziq4
// https://github.com/rd003/angular-23


@Component({
  selector: 'app-ngx-infinite-scroll',
  templateUrl: './ngx-infinite-scroll.component.html',
  styleUrls: ['./ngx-infinite-scroll.component.scss']
})
export class NgxInfiniteScrollComponent implements OnInit {
  items:string[]=[];
  isLoading=false;
  currentPage=1;
  itemsPerPage=10;

  toggleLoading = ()=>{this.isLoading = !this.isLoading;}

  loadData = ()=>{
    this.toggleLoading();
    this.paginationService.getItems(this.currentPage, this.itemsPerPage).subscribe({
      next: response=>this.items = response,
      error: err=>console.log(err),
      complete: ()=>this.toggleLoading()
    })
  }

  getUserId() {
    console.log("loading request...")
    this.apiService.getUserId().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  appendData=()=>{
    this.toggleLoading();
    this.paginationService.getItems(this.currentPage,this.itemsPerPage).subscribe({
      next:response=>this.items = [...this.items,...response],
      error:err=>console.log(err),
      complete:()=>this.toggleLoading()
    })
  }

  onScroll = ()=>{
    this.currentPage++;
    this.appendData();
  }

  constructor(private paginationService:PaginationDummyService, private apiService: ApiService){}
}
