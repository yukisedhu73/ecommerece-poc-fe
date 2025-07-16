import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalPages: number[] = [];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Output() pageSelect = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  previousPage() {
    if (this.currentPage > 1) {
      this.pageSelect.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages.length) {
      this.pageSelect.emit(this.currentPage + 1);
    }
  }

  onPageSelect(page: number) {
    if (page >= 1 && page <= this.totalPages.length) {
      this.pageSelect.emit(page);
    }
  }

  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = +selectElement.value;
    this.pageSizeChange.emit(newSize);  // emit number, not the event
  }
  
}
