import {Component} from "@angular/core";
import {ArticlesService} from "../../../services/articles.service";
import {AlertController, NavParams, ToastController, ViewController} from "ionic-angular";
import {CD} from "../../../models/CD";

@Component({
  selector: 'page-single-cd',
  templateUrl: 'single-cd.html'
})

export class SingleCdPage {

  index: number;
  cd: CD;

  constructor(private articleService: ArticlesService,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.articleService.cdList[this.index];
  }

  dismissModal() {
    this.articleService.saveCds();
    this.viewCtrl.dismiss();
  }

  onToggleCd() {

    if(this.cd.isLent){
      this.cd.isLent = !this.cd.isLent;
      this.cd.loueur = '';
    } else  {

      let alert = this.alertCtrl.create({
        title: 'Enter the name of the renter',
        inputs: [
          {
            name: 'loueur'
          }
        ],
        buttons: [
          {
            text:'Annuler',
            role: 'cancel'
          },
          {
            text: 'Confirmer',
            handler: data => {
              if(data.loueur !== ''){
                this.cd.loueur = data.loueur;
                this.cd.isLent = !this.cd.isLent
              } else {
                this.showErrorToast('Invalid name, please enter the name of the renter')
              }
            }
          }
        ]
      });
      alert.present();
    }
  }

  showErrorToast(data: string) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }


  onDeleteCd(){
    this.articleService.cdList.splice(this.index, 1);
    this.articleService.saveCds();
    this.viewCtrl.dismiss();   
  }
}
