import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticated: boolean = false;
  currentUser: User;

  constructor() { }


}
