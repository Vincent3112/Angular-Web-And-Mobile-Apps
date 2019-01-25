import {Component} from "@angular/core";
import {ArticlesService} from "../../services/articles.service";
import {Book} from "../../models/Book";
import {MenuController, ModalController} from "ionic-angular";
import {SingleBookPage} from "./single-book/single-book";
import {TabsPage} from "../tabs/tabs";
import {CD} from "../../models/CD";

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
      return 'en prêt';
    } else {
      return 'en stock';
    }
  }
}
