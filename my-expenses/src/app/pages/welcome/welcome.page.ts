import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Creditor } from 'src/app/models/creditor';
import { CreditorService } from 'src/app/services/creditor.service';
import { DebtService } from 'src/app/services/debt.service';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Debt } from 'src/app/models/debt';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit, OnDestroy {

  unPaidDebts: Debt[];
  unPaidCreditors: Creditor[];
  paidCreditors: Creditor[];
  paidDebts: Debt[];
  subscriptions: Subscription[] = [];
  creditsAmount: number = 0;
  debtsAmount: number = 0;
  paidCredits: number = 0;
  paidDebtsAmount: number = 0;
  sliderConfig = {
    slidesPerView: 1.4,
    spaceBetween: 5,
    centeredSlides: true
  };
  public currencyList: String[];

  constructor(private creditorService: CreditorService,
    private debtService: DebtService,
    private navCtrl: NavController,
    private loginService: LoginService,
    private popoverCtrl: PopoverController) {
  }

  ngOnInit() {

    this.currencyList = [
      'fr',
      'en',
      'de'
    ]

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

    let subFour = this.debtService.getPaidDebt().subscribe(
      data => {
        this.paidDebts = data
        this.loginService.currentUser.paidDebts = [];
        this.paidDebtsAmount = 0;
        for (let i = 0; i < this.paidDebts.length; i++) {
          if (this.paidDebts[i].username === this.loginService.currentUser.username) {
            this.paidDebtsAmount += this.paidDebts[i].amount;
            console.log(this.paidDebtsAmount);
            this.loginService.currentUser.paidDebts.push(this.paidDebts[i]);
          }
        }
      }
    )
    this.subscriptions.push(subFour);

    let subTwo = this.creditorService.getUnPaidCreditors().subscribe(
      data => {
        this.unPaidCreditors = data
        this.loginService.currentUser.unPaidCreditors = [];
        this.creditsAmount = 0;
        for (let i = 0; i < this.unPaidCreditors.length; i++) {
          if (this.loginService.currentUser.username === this.unPaidCreditors[i].username) {
            this.creditsAmount += this.unPaidCreditors[i].amount;
            console.log(this.creditsAmount);
            this.loginService.currentUser.unPaidCreditors.push(this.unPaidCreditors[i]);
          }
        }
      }
    )
    this.subscriptions.push(subTwo);

    let subThree = this.creditorService.getPaidCreditors().subscribe(
      data => {
        this.paidCreditors = data
        this.loginService.currentUser.paidCreditors = [];
        this.paidCredits = 0;
        for (let i = 0; i < this.paidCreditors.length; i++) {
          if (this.paidCreditors[i].username === this.loginService.currentUser.username) {
            this.paidCredits += this.paidCreditors[i].amount;
            this.loginService.currentUser.paidCreditors.push(this.paidCreditors[i]);
          }
        }
      }
    )
    this.subscriptions.push(subThree);
  }

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscrptions => subscrptions.unsubscribe());
  }


}