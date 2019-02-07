import { Component, OnInit } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private menuCtrl: MenuController,
              private articleService: ArticlesService) {

  }



  onToggleMenu() {
    this.menuCtrl.open();
  }
}