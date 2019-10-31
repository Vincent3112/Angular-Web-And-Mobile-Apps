import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { Creditor } from 'src/app/models/creditor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CreditorService } from 'src/app/services/creditor.service';
import { LoginService } from 'src/app/services/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-single-creditor',
  templateUrl: './single-creditor.page.html',
  styleUrls: ['./single-creditor.page.scss'],
})
export class SingleCreditorPage implements OnInit {

  form: FormGroup;

  creditor: Creditor;

  chiffre: number = 3.12;

  constructor(private navParams: NavParams,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private creditorService: CreditorService,
    private loginService: LoginService,
    private toastCtrl: ToastController,
    private translateService: TranslateService) { }

  ngOnInit() {
    console.log(this.chiffre);
    this.initForm();
  }

  public initForm() {
    this.creditor = this.navParams.get('creditor_infos');
    this.form = this.formBuilder.group({
      name: new FormControl(this.creditor.name, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])),
      amount: new FormControl(this.creditor.amount, Validators.compose([
        Validators.required,
        Validators.pattern('^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$')
      ])),
      description: new FormControl(this.creditor.description, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ]))
    });
  }

  public closeModal() {
    if (this.form.dirty) {
      this.showToast();
    }
    this.creditorService.updateCreditor(this.creditor.id, this.creditor);
    this.modalCtrl.dismiss();
  }

  private async showToast() {
    let toast = await this.toastCtrl.create({
      message: this.translateService.instant('CREDITOR.UPDATED'),
      duration: 2000,
      position: 'top',
      color: 'success',
      animated: true
    });
    toast.present();
  }
}
