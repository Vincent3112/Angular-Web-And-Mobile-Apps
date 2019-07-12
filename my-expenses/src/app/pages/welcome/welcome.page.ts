import { Component, OnInit } from '@angular/core';
import { Creditor } from 'src/app/models/creditor';
import { CreditorService } from 'src/app/services/creditor.service';
import { DebtService } from 'src/app/services/debt.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  creditorsNbr;
  debtsNumber;

  constructor(private creditorService: CreditorService, private debtService: DebtService, private navCtrl: NavController) { }

  ngOnInit() {
    this.creditorsNbr = this.creditorService.unPaidCredits.length;
    this.debtsNumber = this.debtService.unPaidDebts.length;

  }

}
