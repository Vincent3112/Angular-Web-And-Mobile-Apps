import {Component} from "@angular/core";
import {ArticlesService} from "../../services/articles.service";
import {Book} from "../../models/Book";
import {MenuController, ModalController} from "ionic-angular";
import {SingleBookPage} from "./single-book/single-book";
import {TabsPage} from "../tabs/tabs";
import {CD} from "../../models/CD";
import {listenToElementOutputs} from "@angular/core/src/view/element";

@Component({
  selector: 'page-bookList',
  templateUrl: 'bookList.html'
})

export class bookListPage {

  bookList: Book[];

  constructor(private articleService: ArticlesService,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController){

  }


  ionViewWillEnter() {
    this.bookList = this.articleService.bookList.slice();
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
}
