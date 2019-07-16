import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { Creditor } from 'src/app/models/creditor';
import { Debt } from 'src/app/models/debt';
import { Attribute } from '@angular/compiler';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  errorMessage = "";
  username: string = "";
  password: string = "";
  form: FormGroup;
  unPaidDebts: Debt[] = [];
  paidDebts: Debt[] = [];
  unPaidCredits: Creditor[] = [];
  paidCredits: Creditor[] = [];

  constructor(private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private loginService: LoginService) {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  ngOnInit() {
  }

  public async login() {
    this.errorMessage = "";
    this.username = this.form.get('username').value;
    this.password = this.form.get('password').value;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.username + "@douze.com", this.password);
      if (res) {
        this.loginService.authenticated = true;
        console.log("logged in !");
        this.navCtrl.navigateForward('/menu/tabs/tabs/welcome');
        this.loginService.currentUser = new User(this.username, this.password, this.unPaidDebts, this.paidDebts, this.unPaidCredits, this.paidCredits);
      }
    }
    catch (err) {
      console.dir(err)
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        this.errorMessage = "Non d'utilisateur ou mot de passe incorrect"
      }
    }
  }

}
