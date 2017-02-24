import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notas-detalhes',
  templateUrl: 'notas-detalhes.html'
})
export class NotasDetalhesPage {

  private disciplina: any;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.disciplina = navParams.get('disciplina');

    console.log('NotasDetalhes', this.disciplina);
  }

  porcentagem(nota, max = 100) {
    return Number(
      ((parseFloat(nota.replace(',', '.'))/max) * 100 ).toFixed(2)
    );
  }

  calculaCor(nota, max = 100) {
    if(nota == 0) return 'ligth';
    if(this.porcentagem(nota, max) >= 60) return 'primary';
    else return 'danger';
  }
}
