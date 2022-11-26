import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/interface/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css'],
})
export class BookdetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService
  ) {}

  state = {
    isLoading: true,
    data: <Book>{},
    error: '',
  };

  updateModalState: boolean = false;

  ngOnInit(): void {
    this.getBookById();
  }

  openUpdateModal(): void {
    this.updateModalState = true;
  }

  closeUpdateModal(): void {
    this.updateModalState = false;
  }

  getBookById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe((book) => {
      if (!book) {
        alert(`No Book Found with Id ${id}`);
        this.goBack();
      } else {
        this.state.data = book;
        setTimeout(() => {
          this.state.isLoading = false;
        }, 1000);
      }
    });
  }

  deleteBookById(bookId: number): void {
    const getConfirmationFromUser = window.confirm(
      'Do you want to proceed this operation?'
    );

    if (!getConfirmationFromUser) return;

    const id = Number(bookId);
    this.bookService.deleteBookById(id).subscribe((book) => {
      this.goBack();
    });
  }

  updateBook(book: Book): void {
    this.state.data = book;
  }

  goBack(): void {
    this.location.back();
  }

  copyLink(): void {
    window.navigator.clipboard.writeText(window.location.href);
    window.alert('Link copied to clipboard!');
  }
}
