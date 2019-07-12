import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Creditor } from 'src/app/models/creditor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-single-creditor',
  templateUrl: './single-creditor.page.html',
  styleUrls: ['./single-creditor.page.scss'],
})
export class SingleCreditorPage implements OnInit {

  form: FormGroup;
  
  creditor: Creditor;

  constructor(private navParams: NavParams, private modalCtrl: ModalController, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.creditor = this.navParams.get('creditor_infos');
    this.form = this.formBuilder.group({
      name : new FormControl(this.creditor.name, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      amount : new FormControl(this.creditor.amount, Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$')
      ])),
      description : new FormControl(this.creditor.description, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    });
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
