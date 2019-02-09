import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Book} from "../../models/Book";
import {ArticlesService} from '../../services/articles.service';

@IonicPage()
@Component({
  selector: 'page-book-form',
  templateUrl: 'book-form.html',
})
export class BookFormPage implements OnInit{


  bookForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private articlesService: ArticlesService) {
  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      auteur: ['', Validators.required],
      prix: ['', Validators.required],
      descrition: this.formBuilder.array([])
    });
  }

  onSubmitForm() {
    let newBook = new Book(this.bookForm.get('name').value, this.bookForm.get('auteur').value, this.bookForm.get('prix').value, '');
    this.articlesService.addBook(newBook);
    this.navCtrl.pop();
  }

  onBack(){
    this.navCtrl.pop();
  }
}
