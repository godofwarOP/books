import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Book } from 'src/interface/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  private API_BASE_URL = 'http://localhost:3004/books/';

  state = {
    sort: 'title',
    order: 'asc',
  };

  private errorHandler<T>(operation = 'Operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  getBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(
        `${this.API_BASE_URL}?_sort=${this.state.sort}&_order=${this.state.order}`
      )
      .pipe(catchError(this.errorHandler<Book[]>('getBooks', [])));
  }

  getBookById(id: number): Observable<Book> {
    const url = `${this.API_BASE_URL}${id}`;
    return this.http.get<Book>(url).pipe(
      tap((book) => {
        book.releaseDate = new Date(book.releaseDate).toDateString();
        return {
          ...book,
          releaseDate: book.releaseDate,
        };
      }),
      catchError(this.errorHandler<Book>('getBook'))
    );
  }

  deleteBookById(id: number): Observable<Book> {
    const url = `${this.API_BASE_URL}${id}`;
    return this.http
      .delete<Book>(url)
      .pipe(catchError(this.errorHandler<Book>('deleteBook')));
  }

  addBook(book: Book): Observable<Book> {
    return this.http
      .post<Book>(this.API_BASE_URL, book, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(catchError(this.errorHandler<Book>('addBook')));
  }

  updateBookById(id: number, book: Book): Observable<Book> {
    const url = `${this.API_BASE_URL}${id}`;
    return this.http
      .patch<Book>(url, book, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(catchError(this.errorHandler<Book>('updateBook')));
  }
}
