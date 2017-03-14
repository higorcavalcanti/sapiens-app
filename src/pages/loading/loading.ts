import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Splashscreen} from "ionic-native";

import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';

import {API} from '../../providers/api';
import {Configuracoes} from '../../providers/configuracoes';

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})
export class LoadingPage {

  constructor(public navCtrl: NavController, private configs: Configuracoes, private api: API) {
    this.configs.initializePreferences().then((load) => {
      Splashscreen.hide();

      let config = this.configs.getConfigs();

      if (config.usuario.save) {
        this.api.setBody({user: config.usuario.user, pass: config.usuario.pass});
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }
}
