import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import * as firebase from 'firebase';
import {AuthPage} from "../pages/auth/auth";
import { ArticlesService } from '../services/articles.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  isAuth: boolean;
  authPage: any = AuthPage;
  tabsPage:any = TabsPage;
  settingsPage: any = SettingsPage;

  @ViewChild('content') content: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private articleService: ArticlesService ) {

    

    platform.ready().then(() => {

      let config = {
        apiKey: "AIzaSyAfExHQTrTehSGQwZvjQjEdXAD3vNBNg6U",
        authDomain: "ionicbooksandcds.firebaseapp.com",
        databaseURL: "https://ionicbooksandcds.firebaseio.com",
        projectId: "ionicbooksandcds",
        storageBucket: "",
        messagingSenderId: "74118187154"
      };
      firebase.initializeApp(config);
      this.articleService.fetchBooks();
      this.articleService.fetchCds();
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(TabsPage);
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, {mode: 'connect'});
          }
        }
      )


      statusBar.styleDefault();
      splashScreen.hide();
    });

    
  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}

