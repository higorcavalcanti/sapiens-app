import {Component} from '@angular/core';
import {App,NavController} from 'ionic-angular';

import {LoadingPage} from '../loading/loading';

import {Configuracoes} from '../../providers/configuracoes';
import {Sapiens} from '../../providers/sapiens';

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html'
})
export class ConfiguracoesPage {

  public config: any;

  constructor(public navCtrl: NavController, private configProvider: Configuracoes, private sapiens: Sapiens,public app:App) {
    this.config = this.configProvider.getConfigs();
  }

  changed() {
   this.configProvider.changed( this.config );
  }

  public logout() {
    this.sapiens.logout().then(() => {
   //this.navCtrl.setRoot(LoadingPage);
      this.app.getRootNav().setRoot(LoadingPage);
    });
  }
}
