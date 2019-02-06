import {Component} from "@angular/core";
import {Book} from "../../../models/Book";
import {ArticlesService} from "../../../services/articles.service";
import {AlertController, NavParams, ToastController, ViewController} from "ionic-angular";

@Component({
  selector: 'page-single-book',
  templateUrl: 'single-book.html'
})

export class SingleBookPage {

  index: number;
  book: Book;

  constructor(private articleService: ArticlesService,
              public navParams: NavParams,
              private viewController: ViewController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.articleService.bookList[this.index];
  }

  dismissModal() {
    this.viewController.dismiss();
  }


  onToggleBook() {

    if(this.book.isLent){
      this.book.isLent = !this.book.isLent;
      this.book.loueur = '';
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
              this.book.loueur = data.loueur;
              this.book.isLent = !this.book.isLent
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
}
