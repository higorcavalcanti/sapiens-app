import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Configuracoes} from '../../providers/configuracoes';

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html'
})
export class ConfiguracoesPage {

  @ViewChild('myForm') form;
  public config: any;

  constructor(public navCtrl: NavController, private configProvider: Configuracoes) {
    this.config = this.configProvider.getConfigs();
  }

  private changed() {
   this.configProvider.changed( this.config );
  }

  public logout() {

  }
}
