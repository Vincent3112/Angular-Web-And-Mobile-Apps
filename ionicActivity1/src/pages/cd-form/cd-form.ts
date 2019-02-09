import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CD} from "../../models/CD";
import {ArticlesService} from '../../services/articles.service';

@IonicPage()
@Component({
  selector: 'page-cd-form',
  templateUrl: 'cd-form.html',
})
export class CdFormPage implements OnInit{

  cdForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private articlesService: ArticlesService) {
  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.cdForm = this.formBuilder.group({
      name: ['', Validators.required],
      artiste: ['', Validators.required],
      prix: ['', Validators.required],
      descrition: this.formBuilder.array([])
    });
  }

  onSubmitForm() {
    let newCD = new CD(this.cdForm.get('name').value, this.cdForm.get('artiste').value, this.cdForm.get('prix').value, '');
    this.articlesService.addCd(newCD);
    this.navCtrl.pop();
  }

  onBack(){
    this.navCtrl.pop();
  }

}
