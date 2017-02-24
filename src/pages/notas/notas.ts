import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { NotasDetalhesPage } from '../notas-detalhes/notas-detalhes';

import { Notas } from '../../providers/notas';

@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html'
})
export class NotasPage {

  private notas: any;

  constructor(public navCtrl: NavController, private notasProvider: Notas, private alertCtrl: AlertController) {
    this.notas = this.notasProvider.getNotas();
  }

  doRefresh(refresher) {
    this.notasProvider.notasOnline().then(
      sucess => {
        console.log('NotasPage > refresh', sucess);
        refresher.complete();
      },
      err => {
        console.log('NotasPage > refresh > err', err);
        refresher.complete();
        this.alertCtrl.create({
          title: 'Falha ao carregar',
          subTitle: err,
          buttons: ['Fechar']
        }).present();
      }
    )
  }

  disciplina(d) {
    this.navCtrl.push(NotasDetalhesPage, {disciplina: d});
  }
}
