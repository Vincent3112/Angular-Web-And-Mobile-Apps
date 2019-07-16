import { Component, OnInit } from '@angular/core';
import { Creditor } from 'src/app/models/creditor';
import { CreditorService } from 'src/app/services/creditor.service';
import { DebtService } from 'src/app/services/debt.service';
import { NavController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginService } from 'src/app/services/login.service';
import { Debt } from 'src/app/models/debt';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  creditorsNbr = 2;
  debtsNumber = 1;

  constructor(private creditorService: CreditorService,
    private debtService: DebtService,
    private navCtrl: NavController,
    private loginService: LoginService) { }

  ngOnInit() {
    console.log("welcome page on init");
    console.log(this.loginService.currentUser.username);

  }

}
