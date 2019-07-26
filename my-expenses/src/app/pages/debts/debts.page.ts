import { Component, OnInit, OnDestroy } from '@angular/core';
import { DebtService } from 'src/app/services/debt.service';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Debt } from 'src/app/models/debt';
import { SingleDebtPage } from './single-debt/single-debt.page';
import { PaidDebtsPage } from './paid-debts/paid-debts.page';
import { LoginService } from 'src/app/services/login.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.page.html',
  styleUrls: ['./debts.page.scss'],
})
export class DebtsPage implements OnInit {

  unPaidDebts: Debt[];
  paidDebts: Debt[];
  private subscriptions: Subscription[] = [];

  constructor(private debtService: DebtService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private loginService: LoginService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.initData();
  }

  public initData() {
    let subOne = this.debtService.getUnPaidDebt().subscribe(
      data => {
        this.unPaidDebts = data
        this.loginService.currentUser.unPaidDebts = [];
        for (let i = 0; i < this.unPaidDebts.length; i++) {
          if (this.loginService.currentUser.username === this.unPaidDebts[i].username) {
            this.loginService.currentUser.unPaidDebts.push(this.unPaidDebts[i]);
          }
        }
      }
    )
    this.subscriptions.push(subOne);
    let subTwo = this.debtService.getPaidDebt().subscribe(
      data => {
        this.paidDebts = data
        this.loginService.currentUser.paidDebts = [];
        for (let i = 0; i < this.paidDebts.length; i++) {
          if (this.paidDebts[i].username === this.loginService.currentUser.username) {
            this.loginService.currentUser.paidDebts.push(this.paidDebts[i]);
          }
        }
      }
    )
    this.subscriptions.push(subTwo);
  }

  public async onLoadDebt(debt: Debt) {
    const modal = await this.modalCtrl.create({
      component: SingleDebtPage,
      componentProps: {
        debt_infos: debt
      }
    });
    modal.present();
  }

  public onAddDebt() {
    this.navCtrl.navigateForward(`/new-debt`);
  }

  public onChangeStatus(debt: Debt) {
    this.showToast()
    debt.paid = true;
    this.debtService.addPaidDebt(debt);
    this.debtService.removePaidDebt(debt.id);
  }

  public async onDisplayHistory() {
    const modal = await this.modalCtrl.create({
      component: PaidDebtsPage
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
      message: this.translateService.instant('DEBT.REIMBURSED'),
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
