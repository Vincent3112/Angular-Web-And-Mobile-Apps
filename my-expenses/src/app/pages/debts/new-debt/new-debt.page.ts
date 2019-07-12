import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DebtService } from 'src/app/services/debt.service';

@Component({
  selector: 'app-new-debt',
  templateUrl: './new-debt.page.html',
  styleUrls: ['./new-debt.page.scss'],
})
export class NewDebtPage implements OnInit {

  form: FormGroup;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private debtService: DebtService) { 
    this.form = this.formBuilder.group({
      name : new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      amount : new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ])),
      description : new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    });
  }

  ngOnInit() {
  }


  public onCancel(){
    this.navCtrl.navigateBack(`/tabs/debts`)
  }

  public onValidateForm(form: FormGroup){
    this.debtService.addDebt(form);
    this.navCtrl.navigateBack(`/tabs/debts`);
  }

}
