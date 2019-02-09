import { Component } from '@angular/core';
import {MenuController, NavController, App} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  constructor(public navCtrl: NavController,
              private menuCtrl: MenuController,
              public appCtrl: App) {

  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

}