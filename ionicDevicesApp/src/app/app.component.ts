import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {OptionsPage} from "../pages/options/options";
import * as firebase from 'firebase';
import {AuthPage} from "../pages/auth/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  isAuth: boolean;

  tabsPage: any = TabsPage;
  optionsPage: any = OptionsPage;
  authPage: any = AuthPage;

  @ViewChild('content') content: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {

      let config = {
        apiKey: "AIzaSyBtrvhQZG0__HhZX5UQHP14_oSGafgCem8",
        authDomain: "appareilsionic.firebaseapp.com",
        databaseURL: "https://appareilsionic.firebaseio.com",
        projectId: "appareilsionic",
        storageBucket: "",
        messagingSenderId: "162318804542"
      };
      firebase.initializeApp(config);

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

