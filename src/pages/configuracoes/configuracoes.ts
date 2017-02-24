import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Configuracoes} from '../../providers/configuracoes';

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html'
})
export class ConfiguracoesPage {

  public config: any;

  constructor(public navCtrl: NavController, private configProvider: Configuracoes) {
    this.config = {};
  }

  public ionViewWillEnter() {
    this.config = this.configProvider.getPreferences();
  }

  public changed(event) {
    this.configProvider.save(this.config);
  }

  public logout() {

  }

}
