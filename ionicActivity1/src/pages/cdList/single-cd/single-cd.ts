import {Component} from "@angular/core";
import {ArticlesService} from "../../../services/articles.service";
import {NavParams, ViewController} from "ionic-angular";
import {CD} from "../../../models/CD";

@Component({
  selector: 'page-single-cd',
  templateUrl: 'single-cd.html'
})

export class SingleCdPage {

  index: number;
  cd: CD;

  constructor(private articleService: ArticlesService,
              public viewCtrl: ViewController,
              public navParams: NavParams) {

  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.articleService.cdList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleCd() {
    this.cd.isLent = !this.cd.isLent;
  }
}
