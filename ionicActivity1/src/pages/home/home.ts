import { Component } from '@angular/core';
import {MenuController, NavController, App, ViewController} from 'ionic-angular';
import { ArticlesService } from '../../services/articles.service';
import { bookListPage } from '../bookList/bookList';
import { cdListPage } from '../cdList/cdList';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  constructor(public navCtrl: NavController,
              private menuCtrl: MenuController,
              public appCtrl: App,
              private articleService : ArticlesService,
              private viewCtrl : ViewController) {

  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onAccessBooks(){
    this.navCtrl.push(bookListPage);
  }

  onAccessCds(){
    this.navCtrl.push(cdListPage);
  }

}