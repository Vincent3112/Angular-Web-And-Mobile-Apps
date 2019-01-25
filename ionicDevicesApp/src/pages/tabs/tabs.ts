import {SettingsPage} from "../settings/settings";
import {Component} from "@angular/core";
import {AppareilsPage} from "../appareils/appareils";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage{

  appareilsPage = AppareilsPage;
  settingsPage = SettingsPage;
}
