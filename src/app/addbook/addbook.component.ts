import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/interface/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  public bookData = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    releaseDate: ['', Validators.required],
    coverUrl: ['', Validators.required],
  });

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  saveBook(): void {
    const status = this.bookData.status;

    if (status === 'VALID') {
      this.bookData.value.releaseDate = new Date(
        this.bookData.value.releaseDate!
      ).toDateString();
      this.bookService
        .addBook({ ...this.bookData.value } as Book)
        .subscribe((book) => {
          alert('Book Saved Successfully!');
          this.goBack();
        });
    } else if (status === 'INVALID') {
      alert('All Fields are Mandatory!');
    }
  }

  clearForm(): void {
    this.bookData.setValue({
      title: '',
      author: '',
      coverUrl: '',
      releaseDate: '',
    });
  }
}
