import {Component} from "@angular/core";
import {Book} from "../../../models/Book";
import {ArticlesService} from "../../../services/articles.service";
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'page-single-book',
  templateUrl: 'single-book.html'
})

export class SingleBookPage {

  index: number;
  book: Book;


  constructor(private articleService: ArticlesService,
              public navParams: NavParams,
              private viewController: ViewController) {

  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.articleService.bookList[this.index];
  }

  dismissModal() {
    this.viewController.dismiss();
  }


  onToggleBook() {
    this.book.isLent = !this.book.isLent;
  }
}
