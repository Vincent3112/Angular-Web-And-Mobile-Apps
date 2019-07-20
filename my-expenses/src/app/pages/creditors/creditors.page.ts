import { Component, OnInit } from '@angular/core';
import { CreditorService } from 'src/app/services/creditor.service';
import { Creditor } from 'src/app/models/creditor';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { SingleCreditorPage } from './single-creditor/single-creditor.page';
import { PaidCreditsPage } from './paid-credits/paid-credits.page';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs'
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
    private loginService: LoginService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private translateService: TranslateService) {
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

  public onChangeStatus(creditor: Creditor) {
    this.showToast()
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

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }

  private async showToast() {
    let toast = await this.toastCtrl.create({
      message: this.translateService.instant('CREDITOR.REIMBURSED'),
      duration: 2000,
      position: 'top',
      color: 'success',
      animated: true
    });
    toast.present();
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscrptions => subscrptions.unsubscribe());
  }
}
