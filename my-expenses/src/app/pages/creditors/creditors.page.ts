import { Component, OnInit } from '@angular/core';
import { CreditorService } from 'src/app/services/creditor.service';
import { Creditor } from 'src/app/models/creditor';
import { NavController, ModalController } from '@ionic/angular';
import { SingleCreditorPage } from './single-creditor/single-creditor.page';

@Component({
  selector: 'app-creditors',
  templateUrl: './creditors.page.html',
  styleUrls: ['./creditors.page.scss'],
})
export class CreditorsPage implements OnInit {

  constructor(private creditorService: CreditorService, private modalCtrl: ModalController, private navCtrl: NavController) { }

  myCreditors: Creditor[];

  ngOnInit() {
    this.creditorService.updateCredits();
    this.myCreditors = this.creditorService.getUnPaidCredits();
  }

  public async onLoadCreditor(creditor: Creditor) {
    const modal = await this.modalCtrl.create({
      component: SingleCreditorPage,
      componentProps: {
        creditor_infos: creditor
      }
    });
    modal.present();
  }

  public onAddCreditor() {
    this.navCtrl.navigateForward(`/new-creditor`);
  }

  public onChangeStatus(){
    // creditor.paid = true;
    // this.creditorService.updateCredits();
    console.log("12");
  }

}
