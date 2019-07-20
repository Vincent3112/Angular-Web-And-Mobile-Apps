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
    private translateService: TranslateService) {

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

  ngOnInit() {
  }

  public async register() {
    this.errorMessage = "";
    this.username = this.form.get('username').value;
    this.password = this.form.get('password').value;
    this.cpassword = this.form.get('cpassword').value;
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.username + "@douze.com", this.password);
      if (res && this.cpassword === this.password) {
        console.log("User created !");
        this.loginService.authenticated = true;
        this.loginService.currentUser = new User(this.username, this.password, [], [], [], []);
        this.navCtrl.navigateForward('/menu/tabs/tabs/welcome');
      }
      if (this.cpassword != this.password) {
        this.errorMessage = "Les mots de passe ne correspondent pas"
        this.form.reset();
        console.log("Passwords don't match")
      }
    }
    catch (err) {
      console.dir(err)
      if (err.code === "auth/email-already-in-use") {
        this.errorMessage = "Nom d'utilisateur déjà utilisé"
        this.form.reset();
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
}
