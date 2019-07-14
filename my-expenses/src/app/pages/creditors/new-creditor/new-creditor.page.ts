import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreditorService } from 'src/app/services/creditor.service';

@Component({
  selector: 'app-new-creditor',
  templateUrl: './new-creditor.page.html',
  styleUrls: ['./new-creditor.page.scss'],
})
export class NewCreditorPage implements OnInit {

  form: FormGroup;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private creditorService: CreditorService) { 
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
    this.navCtrl.navigateBack(`menu/tabs/tabs/creditors`)
  }

  public onValidateForm(form: FormGroup){
    this.creditorService.addCreditor(form);
    this.navCtrl.navigateBack(`menu/tabs/tabs/creditors`);
  }

}
