import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {NavParams} from "ionic-angular";
import {MenuController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})

export class AuthPage implements OnInit{

  mode: string;
  authForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService,
              private navParams: NavParams,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private navCtrl: NavController) {

  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }


  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if(this.mode === 'new'){
      this.authService.signUpUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        }
      ).catch(
        (error) => {
          this.errorMessage = error;
        }
      );
    } else if (this.mode === 'connect') {
      this.authService.signInUser(email, password).then(
        () => {
          this.navCtrl.setRoot(TabsPage);
        }
      ).catch(
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
