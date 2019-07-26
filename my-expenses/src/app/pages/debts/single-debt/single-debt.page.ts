import { Component, OnInit } from '@angular/core';
import { Debt } from 'src/app/models/debt';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DebtService } from 'src/app/services/debt.service';
import { TranslateService } from '@ngx-translate/core';

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
    private debtService: DebtService,
    private toastCtrl: ToastController,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
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


  public closeModal() {
    if (this.form.dirty) {
      this.showToast();
    }
    this.debtService.updateDebt(this.debt.id, this.debt);
    this.modalCtrl.dismiss();
  }

  private async showToast() {
    let toast = await this.toastCtrl.create({
      message: this.translateService.instant('DEBT.UPDATED'),
      duration: 2000,
      position: 'top',
      color: 'success',
      animated: true
    });
    toast.present();
  }
}
