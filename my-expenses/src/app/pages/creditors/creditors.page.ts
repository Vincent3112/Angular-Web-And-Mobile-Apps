import { Component, OnInit } from '@angular/core';
import { CreditorService } from 'src/app/services/creditor.service';
import { Creditor } from 'src/app/models/creditor';
import { NavController, ModalController } from '@ionic/angular';
import { SingleCreditorPage } from './single-creditor/single-creditor.page';
import { PaidCreditsPage } from './paid-credits/paid-credits.page';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creditors',
  templateUrl: './creditors.page.html',
  styleUrls: ['./creditors.page.scss'],
})
export class CreditorsPage implements OnInit {

  unPaidCreditors: Creditor[];
  paidCreditors: Creditor[];
  private subscriptions: Subscription[] = [];

  constructor(private creditorService: CreditorService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private loginService: LoginService) {
  }

  ngOnInit() {
    let subOne = this.creditorService.getUnPaidCreditors().subscribe(
      data => {
        this.unPaidCreditors = data
        this.loginService.currentUser.unPaidCreditors = [];
        for (let i = 0; i < this.unPaidCreditors.length; i++) {
          if (this.loginService.currentUser.username === this.unPaidCreditors[i].username) {
            this.loginService.currentUser.unPaidCreditors.push(this.unPaidCreditors[i]);
          }
        }
      }
    )
    this.subscriptions.push(subOne);
    let subTwo = this.creditorService.getPaidCreditors().subscribe(
      data => {
        this.paidCreditors = data
        this.loginService.currentUser.paidCreditors = [];
        for (let i = 0; i < this.paidCreditors.length; i++) {
          if (this.paidCreditors[i].username === this.loginService.currentUser.username) {
            this.loginService.currentUser.paidCreditors.push(this.paidCreditors[i]);
          }
        }
      }
    )
    this.subscriptions.push(subTwo);
  }

  public async onLoadDebt(creditor: Creditor) {
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

  public onChangeStatus(creditor: Creditor) {
    creditor.paid = true;
    this.creditorService.addPaidCreditor(creditor);
    this.creditorService.removePaidCreditor(creditor.id);
  }

  public async onDisplayHistory() {
    const modal = await this.modalCtrl.create({
      component: PaidCreditsPage
    });
    modal.present();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscrptions => subscrptions.unsubscribe());
  }
}
