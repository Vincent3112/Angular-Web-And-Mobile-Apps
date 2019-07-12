import { Component, OnInit } from '@angular/core';
import { Debt } from 'src/app/models/debt';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-single-debt',
  templateUrl: './single-debt.page.html',
  styleUrls: ['./single-debt.page.scss'],
})
export class SingleDebtPage implements OnInit {

  debt: Debt;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.debt = this.navParams.get('debt_infos');
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
