import { Component, OnInit } from '@angular/core';
import { Debt } from 'src/app/models/debt';
import { DebtService } from 'src/app/services/debt.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-paid-debts',
  templateUrl: './paid-debts.page.html',
  styleUrls: ['./paid-debts.page.scss'],
})
export class PaidDebtsPage implements OnInit {

  constructor(private debtService: DebtService, private modalCtrl: ModalController) { }

  paidDebts: Debt[] = [];
  
  ngOnInit() {
    this.paidDebts = this.debtService.getPaidDebts();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
