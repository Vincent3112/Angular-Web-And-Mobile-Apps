import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookFormPage } from './book-form';

@NgModule({
  declarations: [
    BookFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BookFormPage),
  ],
})
export class BookFormPageModule {}
