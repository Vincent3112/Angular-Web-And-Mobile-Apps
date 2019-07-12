import { Component, OnInit } from '@angular/core';
import { DebtService } from 'src/app/services/debt.service';
import { ModalController, NavController } from '@ionic/angular';
import { Debt } from 'src/app/models/debt';
import { SingleDebtPage } from './single-debt/single-debt.page';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.page.html',
  styleUrls: ['./debts.page.scss'],
})
export class DebtsPage implements OnInit {

  constructor(private debtService: DebtService, private modalCtrl: ModalController, private navCtrl: NavController) { }

  myDebts: Debt[];

  ngOnInit() {
    this.debtService.updateDebts();
    this.myDebts = this.debtService.getUnPaidDebts();
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

  public onChangeStatus(debt: Debt){
    
  }

}
