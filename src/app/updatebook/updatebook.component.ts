import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from 'src/interface/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css'],
})
export class UpdatebookComponent implements OnInit {
  constructor(private bookService: BookService) {}

  @Input() book: Book = {
    id: 0,
    title: '',
    author: '',
    releaseDate: '',
    coverUrl: '',
  };

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() updateBookEvent = new EventEmitter<Book>();

  bookData = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    releaseDate: new FormControl(''),
    coverUrl: new FormControl(''),
  });

  ngOnInit(): void {}

  updateBook(id: number): void {
    const fields = Object.keys(this.bookData.value) as [keyof BookData];
    const validFields = fields.filter(
      (field) => this.bookData.value[field] !== ''
    );

    if (validFields.length === 0) {
      this.bookData.setErrors({
        required: {
          message: 'At Least One Field is required to Update!',
        },
      });
      return;
    }

    var updatedBook = {};

    validFields.forEach((field) => {
      if (field === 'releaseDate') {
        this.bookData.value[field] = new Date(
          this.bookData.value[field]!
        ).toJSON();
      }

      updatedBook = {
        ...updatedBook,
        [field]: this.bookData.value[field],
      };
    });

    this.bookService
      .updateBookById(id, { ...updatedBook } as Book)
      .subscribe((book) => {
        alert('Book Updated Successfuly');
        this.updateBookEvent.emit(book);
        this.closeUpdateModal();
      });
  }

  clearForm(): void {
    this.bookData.setValue({
      title: '',
      author: '',
      releaseDate: '',
      coverUrl: '',
    });
  }

  closeUpdateModal(): void {
    this.closeModalEvent.emit();
  }
}

interface BookData {
  title: string | null;
  author: string | null;
  releaseDate: string | null;
  coverUrl: string | null;
}
