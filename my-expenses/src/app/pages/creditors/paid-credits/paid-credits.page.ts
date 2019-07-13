import { Component, OnInit } from '@angular/core';
import { Creditor } from 'src/app/models/creditor';
import { CreditorService } from 'src/app/services/creditor.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-paid-credits',
  templateUrl: './paid-credits.page.html',
  styleUrls: ['./paid-credits.page.scss'],
})
export class PaidCreditsPage implements OnInit {

  constructor(private creditorService: CreditorService, private modalCtrl: ModalController) { }

  paidCredits: Creditor[] = [];
  
  ngOnInit() {
    this.paidCredits = this.creditorService.getPaidCredits();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
