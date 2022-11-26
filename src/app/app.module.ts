import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { AddbookComponent } from './addbook/addbook.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    SpinnerComponent,
    BookdetailComponent,
    AddbookComponent,
    UpdatebookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
