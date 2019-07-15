import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticated: boolean = false;
  username: string = "";
  password: string = "";
  cpassword: string = "";

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController) { }

  public async login(form: FormGroup) {
    this.username = form.get('username').value;
    this.password = form.get('password').value;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.username + "@douze.com", this.password);
      if (res) {
        this.authenticated = true;
        console.log("logged in !");
        this.navCtrl.navigateForward('/menu/tabs/tabs/welcome');
      }
    }
    catch (err) {
      console.dir(err)
      if (err.code === "auth/user-not-found") {
        console.log("User not found !")
      }
    }
  }

  public async register(form: FormGroup) {
    this.username = form.get('username').value;
    this.password = form.get('password').value;
    this.cpassword = form.get('cpassword').value;
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.username + "@douze.com", this.password);
      if (res && this.cpassword === this.password) {
        console.log("User created !");
        this.authenticated = true;
        this.navCtrl.navigateForward('/menu/tabs/tabs/welcome');
      }
      if (this.cpassword != this.password) {
        console.log("Passwords don't match")
      }
    }
    catch (err) {
      console.dir(err)
    }
  }
}
