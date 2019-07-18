import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Creditor } from 'src/app/models/creditor';
import { CreditorService } from 'src/app/services/creditor.service';
import { DebtService } from 'src/app/services/debt.service';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Debt } from 'src/app/models/debt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  unPaidDebts: Debt[];
  unPaidCreditors: Creditor[];
  subscriptions: Subscription[] = [];

  constructor(private creditorService: CreditorService,
    private debtService: DebtService,
    private navCtrl: NavController,
    private loginService: LoginService) {
    console.log("constructor");
  }

  ngOnInit() {

    console.log("ngoninit");


    let subOne = this.debtService.getUnPaidDebt().subscribe(
      data => {
        this.unPaidDebts = data
        for (let i = 0; i < this.unPaidDebts.length; i++) {
          if (this.loginService.currentUser.username === this.unPaidDebts[i].username) {
            this.loginService.currentUser.unPaidDebts.push(this.unPaidDebts[i]);
          }
        }
      }
    )
    this.subscriptions.push(subOne);

    let subTwo = this.creditorService.getUnPaidCreditors().subscribe(
      data => {
        this.unPaidCreditors = data
        for (let i = 0; i < this.unPaidCreditors.length; i++) {
          if (this.loginService.currentUser.username === this.unPaidCreditors[i].username) {
            this.loginService.currentUser.unPaidCreditors.push(this.unPaidCreditors[i]);
          }
        }
      }
    )
    this.subscriptions.push(subTwo);
  }
}
