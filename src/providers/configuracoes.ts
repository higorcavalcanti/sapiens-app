import {Injectable} from '@angular/core';

import {Database} from './database';

@Injectable()
export class Configuracoes {

  public _preferences: any;

  constructor(public database: Database) {
    console.log('Config provider construtor');
    this._preferences = {};
  }

  public initializePreferences() {
    console.log('initializePreferences');
    this.database.get('configs').then(
      (result: any) => {
        console.log('preferences obtained from storage');
        this._preferences = JSON.parse(result);
      },
      (err) => {
        this._preferences['notif_aula_ativo'] = true;
        this._preferences['notif_aula_tempo'] = 30;
        this._preferences['notif_nota_ativo'] = true;
        this._preferences['notif_nota_tempo'] = 30;
        this.database.set('configs', JSON.stringify(this._preferences)).then();
        console.log('initializePreferences with default values', this._preferences);
      }
    );
  }

  public getPreferences() {
    console.log('config provider getPref', this._preferences);
    return this._preferences;
  }

  public save(prefs) {
    this._preferences = prefs;//update pref in memory
    this.database.set('configs', JSON.stringify(this._preferences));//update pref in db
  }
}
