import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';

import {Sapiens} from '../../providers/sapiens';
import {Configuracoes} from '../../providers/configuracoes';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private login: any;
  private configs: any;

  constructor(private navCtrl: NavController, private sapiens: Sapiens,
              private loadingCtrl: LoadingController, private alertCtrl: AlertController, private configsProvider: Configuracoes) {

    this.configs = this.configsProvider.getConfigs();
    this.login = this.configs.usuario;
  }

  logar() {

    let loading = this.loadingCtrl.create({content: 'Logando...'});
    loading.present();
    let timeout = setTimeout(() => {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Falha no login',
        subTitle: 'Sem comunicação com o servidor!',
        buttons: ['Fechar']
      }).present();
    }, 20000);

    this.sapiens.login(this.login.user, this.login.pass).then(
      (sucess) => {

        if(this.configs.usuario.save) {
          this.configs.usuario = this.login;
        } else {
          this.configs.usuario = {user: '', pass: ''};
        }
        this.configsProvider.changed(this.configs);

        loading.dismiss();
        clearTimeout(timeout);
        this.navCtrl.setRoot(TabsPage);
      },
      err => {
        loading.dismiss();
        clearTimeout(timeout);
        this.alertCtrl.create({
          title: 'Falha no login',
          subTitle: err,
          buttons: ['Fechar']
        }).present();
      }
    );
  }

}
