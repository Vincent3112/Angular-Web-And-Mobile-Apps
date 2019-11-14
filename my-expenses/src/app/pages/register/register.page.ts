import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  username: string = "";
  password: string = "";
  cpassword: string = "";
  errorMessage: string = "";

  constructor(private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private loginService: LoginService,
    private popoverCtrl: PopoverController,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.initForm();
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
      ])),
      cpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  public async register() {
    this.errorMessage = "";
    this.username = this.form.get('username').value;
    this.password = this.form.get('password').value;
    this.cpassword = this.form.get('cpassword').value;

    if (this.cpassword != this.password) {
      this.errorMessage = this.translateService.instant('AUTH.ERROR_MESSAGE2');
      this.form.reset();
    }
    else {
      try {
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.username + "@douze.com", this.password);
        if (res && this.cpassword === this.password) {
          this.loginService.authenticated = true;
          this.loginService.currentUser = new User(this.username, this.password, [], [], [], []);
          this.navCtrl.navigateForward('/menu/tabs/tabs/welcome');
        }
      }
      catch (err) {
        if (err.code === "auth/email-already-in-use") {
          this.errorMessage = this.translateService.instant('AUTH.ERROR_MESSAGE3');
          this.form.reset();
        }
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

  public signupWithFacebook() {
    console.log('signup with facebook');
  }

  public signupWithGoogle() {
    console.log('signup with google');
  }
}
