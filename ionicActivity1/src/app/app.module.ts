import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {cdListPage} from "../pages/cdList/cdList";
import {bookListPage} from "../pages/bookList/bookList";
import {TabsPage} from "../pages/tabs/tabs";
import {ArticlesService} from "../services/articles.service";
import {SingleBookPage} from "../pages/bookList/single-book/single-book";
import {SingleCdPage} from "../pages/cdList/single-cd/single-cd";
import {SettingsPage} from "../pages/settings/settings";
import {AuthPage} from "../pages/auth/auth";
import {AuthService} from "../services/auth.service";
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    cdListPage,
    bookListPage,
    TabsPage,
    SingleBookPage,
    SingleCdPage,
    SettingsPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    cdListPage,
    bookListPage,
    TabsPage,
    SingleBookPage,
    SingleCdPage,
    SettingsPage,
    AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ArticlesService,
    AuthService,
  ]
})
export class AppModule {}
