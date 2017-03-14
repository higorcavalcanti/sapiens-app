import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";

import {Database} from './database';

@Injectable()
export class Configuracoes {

  private _configs: BehaviorSubject<any> = new BehaviorSubject([]);
  private prefs: {
    usuario: {
      save: boolean,
      user?: string,
      pass?: string
    },
    notificacoes: {
      aula: {
        ativo: boolean,
        tempo: number
      },
      nota: {
        ativo: boolean,
        tempo: number
      }
    }
  };

  constructor(public database: Database) {
    console.log('Config provider construtor');

    this._configs.subscribe((pref) => {
      console.log('Configs alteradas', pref);
      this.prefs = pref;
      this.database.set('configs', JSON.stringify(this.prefs));
    });
  }

  public initializePreferences() {
    console.log('initializePreferences');
    this.database.get('configs').then(
      (result: any) => {
        this._configs.next( JSON.parse(result) );
        console.log('preferences obtained from storage');
      },
      (err) => {
        this.prefs = {
          usuario: {
            save: false,
          },
          notificacoes: {
            aula: { ativo: true, tempo: 10 },
            nota: { ativo: false, tempo: 60 },
          }
        };
        this._configs.next( this.prefs );
        console.log('initializePreferences with default values', this.prefs);
      }
    );
  }

  public getConfigsObservable(): Observable<any[]> {
    console.log("ConfigsProvider > getConfigsObservable", this._configs.asObservable());
    return this._configs.asObservable();
  }

  public getConfigs() {
    console.log("ConfigsProvider > getConfigs", this.prefs);
    return this.prefs;
  }

  public changed(config) {
    this._configs.next( config );
  }
}
