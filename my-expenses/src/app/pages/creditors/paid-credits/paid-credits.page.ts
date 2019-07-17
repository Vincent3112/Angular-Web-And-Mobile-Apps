import { Component, OnInit } from '@angular/core';
import { Creditor } from 'src/app/models/creditor';
import { CreditorService } from 'src/app/services/creditor.service';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-paid-credits',
  templateUrl: './paid-credits.page.html',
  styleUrls: ['./paid-credits.page.scss'],
})
export class PaidCreditsPage implements OnInit {

  constructor(private creditorService: CreditorService, private modalCtrl: ModalController, private loginService: LoginService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
