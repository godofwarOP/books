import { Component, OnInit } from '@angular/core';
import { Book } from 'src/interface/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  constructor(public bookService: BookService) {}

  state = {
    isLoading: true,
    data: <Book[]>[],
    error: '',
  };

  ngOnInit(): void {
    this.getBooks();
  }

  sortByTitle(): void {
    this.bookService.state.sort = 'title';
    this.getBooks();
  }

  sortByDate(): void {
    this.bookService.state.sort = 'releaseDate';
    this.getBooks();
  }

  sortByAuthor(): void {
    this.bookService.state.sort = 'author';
    this.getBooks();
  }

  orderByAsc(): void {
    this.bookService.state.order = 'asc';
    this.getBooks();
  }

  orderByDesc(): void {
    this.bookService.state.order = 'desc';
    this.getBooks();
  }

  getBooks(): void {
    this.state.isLoading = true;
    this.bookService.getBooks().subscribe((books) => {
      this.state.data = books;
      setTimeout(() => {
        this.state.isLoading = false;
      }, 1000);
    });
  }
}

// _sort=releaseDate&_order=desc -- sort according to date
// _sort=title&_order=asc -- sort according to title
