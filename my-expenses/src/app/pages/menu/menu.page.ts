import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController } from '@ionic/angular';

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
    private afAuth: AngularFireAuth, private popoverCtrl: PopoverController) {
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
    this.loginService.currentUser.paidCreditors = [];
    this.loginService.currentUser.unPaidCreditors = [];
    this.loginService.currentUser.paidDebts = [];
    this.loginService.currentUser.unPaidDebts = [];
    this.afAuth.auth.signOut();
  }

  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }

}
