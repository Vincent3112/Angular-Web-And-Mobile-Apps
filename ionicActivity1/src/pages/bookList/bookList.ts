import {Component} from "@angular/core";
import {ArticlesService} from "../../services/articles.service";
import {Book} from "../../models/Book";
import {MenuController, ModalController} from "ionic-angular";
import {SingleBookPage} from "./single-book/single-book";
import { BookFormPage } from "../book-form/book-form";

@Component({
  selector: 'page-bookList',
  templateUrl: 'bookList.html'
})

export class bookListPage {

  bookList: Book[];
  index: number;

  constructor(private articleService: ArticlesService,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController){

  }

  ionViewWillEnter() {
    this.bookList = this.articleService.bookList;
  }

  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(SingleBookPage, {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  getStatut(book: Book) {
    if(book.isLent){
      return 'emprunté par ' + book.loueur;
    } else {
      return 'en stock';
    }
  }

  onNewBook(){
    let modal = this.modalCtrl.create(BookFormPage);
    modal.present();
  }
}
