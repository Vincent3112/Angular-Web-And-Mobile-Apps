import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { Creditor } from 'src/app/models/creditor';
import { Debt } from 'src/app/models/debt';
import { TranslateService } from '@ngx-translate/core';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController } from '@ionic/angular';
import * as firebase from 'firebase/app';



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
    private loginService: LoginService,
    private translateService: TranslateService,
    private popoverCtrl: PopoverController) {

    this.initForm();
  }

  ngOnInit() {
  }

  public initForm() {
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

  public async login() {
    this.errorMessage = "";
    this.username = this.form.get('username').value;
    this.password = this.form.get('password').value;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.username + "@douze.com", this.password);
      if (res) {
        this.navCtrl.navigateForward('/menu/tabs/tabs/welcome');
        this.loginService.authenticated = true;
        this.loginService.currentUser = new User(this.username, this.password, this.unPaidDebts, this.paidDebts, this.unPaidCredits, this.paidCredits);
      }
    }
    catch (err) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        this.errorMessage = this.translateService.instant('AUTH.ERROR_MESSAGE1');
      }
    }
  }


  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }

  public loginWithFacebook() {
    console.log('login with facebook');
  }

  public loginWithGoogle() {
    let username;
    console.log('login with google');
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      () => {
        this.loginService.authenticated = true;
        this.afAuth.authState.subscribe(
          data => {
            username = data.email;
            this.loginService.currentUser = new User(username,
              this.password,
              this.unPaidDebts,
              this.paidDebts,
              this.unPaidCredits,
              this.paidCredits);
          }
        );
        this.navCtrl.navigateForward('/menu/tabs/tabs/welcome');
      }
    );
  }

}
