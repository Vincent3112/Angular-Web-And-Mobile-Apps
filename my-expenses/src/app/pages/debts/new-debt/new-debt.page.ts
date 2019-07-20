import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { DebtService } from 'src/app/services/debt.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-debt',
  templateUrl: './new-debt.page.html',
  styleUrls: ['./new-debt.page.scss'],
})
export class NewDebtPage implements OnInit {

  form: FormGroup;

  constructor(private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private debtService: DebtService,
    private toastCtrl: ToastController,
    private translateService: TranslateService) {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    });
  }

  ngOnInit() {
  }


  public onCancel() {
    this.navCtrl.navigateBack(`menu/tabs/tabs/debts`)
  }

  public onValidateForm(form: FormGroup) {
    this.debtService.addUnPaidDebt(form.value);
    this.navCtrl.navigateBack(`menu/tabs/tabs/debts`);
    this.showToast();
  }


  private async showToast() {
    let toast = await this.toastCtrl.create({
      message: this.translateService.instant('DEBT.CREATED'),
      duration: 2000,
      position: 'top',
      color: 'success',
      animated: true
    });
    toast.present();
  }
}
