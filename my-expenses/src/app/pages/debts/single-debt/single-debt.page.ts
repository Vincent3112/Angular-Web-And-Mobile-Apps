import { Component, OnInit } from '@angular/core';
import { Debt } from 'src/app/models/debt';
import { NavParams, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DebtService } from 'src/app/services/debt.service';

@Component({
  selector: 'app-single-debt',
  templateUrl: './single-debt.page.html',
  styleUrls: ['./single-debt.page.scss'],
})
export class SingleDebtPage implements OnInit {

  form: FormGroup;
  debt: Debt;

  constructor(private navParams: NavParams,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private debtService: DebtService) { }

  ngOnInit() {
    this.debt = this.navParams.get('debt_infos');
    this.form = this.formBuilder.group({
      name: new FormControl(this.debt.name, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      amount: new FormControl(this.debt.amount, Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ])),
      description: new FormControl(this.debt.description, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    });
  }

  closeModal() {
    this.debtService.updateDebt(this.debt.id, this.debt);
    this.modalCtrl.dismiss();
  }
}
