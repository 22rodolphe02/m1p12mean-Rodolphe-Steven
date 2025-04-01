import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'g-pagination',
  imports: [
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit{

  @Input("pageSize") itemsPerPage: number = 10;
  @Input("pageIndex") pageIndex: number = 1;
  @Input({required: true, alias: "totalItems"},) totalItems !: number;
  @Input({required: false}) withNo: boolean = true;

  @Output("page") pageChanged: EventEmitter<number> = new EventEmitter();

  pages: number[] = [];

  ngOnInit(): void {
    // this.pageChanged.emit(this.pageIndex)
    this.setPages();
  }


  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  setPages(){

    if (this.totalPages <= 6) {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {

      let start = Math.max(1, this.pageIndex - 2);
      let end = Math.min(this.totalPages, this.pageIndex + 2);

      if (this.pageIndex <= 3) {
        start = 1;
        end = 5;
      } else if (this.pageIndex >= this.totalPages - 2) {
        start = this.totalPages - 4;
        end = this.totalPages;
      }

      this.pages = Array.from({length: end - start + 1}, (_, i) => start + i);
    }
  }


  onChangePage(page: number): void {

    console.log("page ==== ", page, " total pages ==== ", this.totalPages)
    if (page >= 1 && page <= this.totalPages) {
      console.log("coucoudddd")
      this.pageIndex = page;
      this.setPages();
      this.pageChanged.emit(page);
    }
  }
}
