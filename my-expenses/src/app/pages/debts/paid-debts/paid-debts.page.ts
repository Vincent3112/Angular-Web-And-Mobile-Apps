import { Component, OnInit } from '@angular/core';
import { Debt } from 'src/app/models/debt';
import { DebtService } from 'src/app/services/debt.service';
import { ModalController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paid-debts',
  templateUrl: './paid-debts.page.html',
  styleUrls: ['./paid-debts.page.scss'],
})
export class PaidDebtsPage implements OnInit {

  constructor(private modalCtrl: ModalController, private loginService: LoginService) { }


  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
