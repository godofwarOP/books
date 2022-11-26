import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './addbook/addbook.component';
import { BookComponent } from './book/book.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';

const routes: Routes = [
  {
    path: '',
    component: BookComponent,
  },
  {
    path: 'book/:id',
    component: BookdetailComponent,
  },
  {
    path: 'add',
    component: AddbookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
