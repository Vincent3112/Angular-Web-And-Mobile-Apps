import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Creditor } from 'src/app/models/creditor';
import { CreditorService } from 'src/app/services/creditor.service';
import { DebtService } from 'src/app/services/debt.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Debt } from 'src/app/models/debt';
import { Subscription } from 'rxjs';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit, OnDestroy {

  unPaidDebts: Debt[];
  unPaidCreditors: Creditor[];
  subscriptions: Subscription[] = [];
  creditsAmount: number;
  debtsAmount: number;
  sliderConfig = {
    slidesPerView: 1.3,
    spaceBetween: 5,
    centeredSlides: true
  };

  constructor(private creditorService: CreditorService,
    private debtService: DebtService,
    private navCtrl: NavController,
    private loginService: LoginService,
    private alertController: AlertController,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.getData();
  }

  public getData() {
    let subOne = this.debtService.getUnPaidDebt().subscribe(
      data => {
        this.unPaidDebts = data;
        this.loginService.currentUser.unPaidDebts = [];
        this.debtsAmount = 0;
        for (let i = 0; i < this.unPaidDebts.length; i++) {
          if (this.loginService.currentUser.username === this.unPaidDebts[i].username) {
            this.debtsAmount += this.unPaidDebts[i].amount;
            this.loginService.currentUser.unPaidDebts.push(this.unPaidDebts[i]);
          }
        }
      }
    )
    this.subscriptions.push(subOne);

    let subTwo = this.creditorService.getUnPaidCreditors().subscribe(
      data => {
        this.unPaidCreditors = data
        this.loginService.currentUser.unPaidCreditors = [];
        this.creditsAmount = 0;
        for (let i = 0; i < this.unPaidCreditors.length; i++) {
          if (this.loginService.currentUser.username === this.unPaidCreditors[i].username) {
            this.creditsAmount += this.unPaidCreditors[i].amount;
            this.loginService.currentUser.unPaidCreditors.push(this.unPaidCreditors[i]);
          }
        }
      }
    )
    this.subscriptions.push(subTwo);
  }

  public async onAdd() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('HOME.ALERT.TITLE'),
      message: this.translateService.instant('HOME.ALERT.MESSAGE'),
      cssClass: 'alert',
      buttons: [
        {
          text: this.translateService.instant('CREDITOR.ADD'),
          handler: () => {
            this.navCtrl.navigateForward('/new-creditor');
          }
        }, {
          text: this.translateService.instant('DEBT.ADD'),
          handler: () => {
            this.navCtrl.navigateForward('/new-debt');
          }
        },
        {
          text: this.translateService.instant('HOME.ALERT.CANCEL'),
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscrptions => subscrptions.unsubscribe());
  }
}