import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  pages = [
    {
      title: "Accueil",
      url: '/menu/tabs'
    }
  ];

  selectedPath = '';

  constructor(private router: Router, private loginService: LoginService,
    private afAuth: AngularFireAuth) {
    this.router.events.subscribe(
      (event: RouterEvent) => {
        if (event && event.url) {
          this.selectedPath = event.url;
        }
      }
    );
  }

  ngOnInit() {
  }

  public onLogout() {
    this.loginService.authenticated = false;
    this.loginService.currentUser.paidCredits = [];
    this.loginService.currentUser.unPaidCredits = [];
    this.loginService.currentUser.paidDebts = [];
    this.loginService.currentUser.unPaidDebts = [];
    this.afAuth.auth.signOut();
  }

}
