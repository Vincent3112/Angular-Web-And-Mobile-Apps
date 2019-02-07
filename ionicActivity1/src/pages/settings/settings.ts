import {Component} from "@angular/core";
import {MenuController} from "ionic-angular";
import { LoadingController, ToastController } from "ionic-angular";
import {ArticlesService} from "../../services/articles.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {


  constructor(private menuCtrl: MenuController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private articlesService: ArticlesService) {

  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onSaveBooks(){
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();
    this.articlesService.saveBooks().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'données sauvegardées',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    ).catch(
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onFetchBooks(){
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours...'
    });
    loader.present();
    this.articlesService.fetchBooks().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'données récupérées',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    ).catch(
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onSaveCds(){
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();
    this.articlesService.saveCds().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'données sauvegardées',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    ).catch(
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onFetchCds(){
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours...'
    });
    loader.present();
    this.articlesService.fetchCds().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'données récupérées',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    ).catch(
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }
}
