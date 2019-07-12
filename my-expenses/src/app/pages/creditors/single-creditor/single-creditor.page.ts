import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';
import { Creditor } from 'src/app/models/creditor';

@Component({
  selector: 'app-single-creditor',
  templateUrl: './single-creditor.page.html',
  styleUrls: ['./single-creditor.page.scss'],
})
export class SingleCreditorPage implements OnInit {

  creditor: Creditor;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.creditor = this.navParams.get('creditor_infos');
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
