import {Component} from "@angular/core";
import {CD} from "../../models/CD";
import {ArticlesService} from "../../services/articles.service";
import {MenuController, ModalController} from "ionic-angular";
import {SingleCdPage} from "./single-cd/single-cd";
import {CdFormPage} from '../cd-form/cd-form';

@Component({
  selector: 'page-cdList',
  templateUrl: 'cdList.html'
})

export class cdListPage {

  cdList: CD[];
  index: number;
  deleteMode: boolean = false;

  constructor(private articleService: ArticlesService,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController) {

  }

  ionViewWillEnter() {
    this.cdList = this.articleService.cdList;
  }

  onLoadCd(i: number) {
    let modal = this.modalCtrl.create(SingleCdPage, {index: i});
    modal.present();
  }

  getStatut(cd: CD) {
    if(cd.isLent){
      return 'emprunté par ' + cd.loueur;
    } else {
      return 'en stock';
    }
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onNewCd(){
    let modal = this.modalCtrl.create(CdFormPage);
    modal.present();
  }
}
