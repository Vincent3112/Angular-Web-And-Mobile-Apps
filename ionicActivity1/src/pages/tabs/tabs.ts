import {cdListPage} from "../cdList/cdList";
import {bookListPage} from "../bookList/bookList";
import {Component} from "@angular/core";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {

  cdPage = cdListPage;
  bookPage = bookListPage;
  homePage = HomePage;
}
