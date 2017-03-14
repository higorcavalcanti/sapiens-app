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
  }

  public initializePreferences() {
    console.log('initializePreferences');
    return new Promise((resolve) => {
      this.database.get('configs').then(
        (result: any) => {
          this._configs.next(JSON.parse(result));
          console.log('preferences obtained from storage', JSON.parse(result));
          resolve(1);
        },
        (err) => {
          this.padrao();
          this._configs.next(this.prefs);
          console.log('initializePreferences with default values', this.prefs);
          resolve(2);
        }
      );
    });
  }

  public getConfigsObservable(): Observable<any[]> {
    console.log("ConfigsProvider > getConfigsObservable", this._configs.asObservable());
    return this._configs.asObservable();
  }

  public getConfigs() {
    if (this.prefs == null) {
      this.padrao();
    }
    console.log("ConfigsProvider > getConfigs", this.prefs);
    return this.prefs;
  }

  public changed(config) {
    this._configs.next(config);
    this.database.set('configs', JSON.stringify(this.prefs));
  }

  private padrao() {
    this.prefs = {
      usuario: {
        user: '',
        pass: '',
        save: false,
      },
      notificacoes: {
        aula: {ativo: true, tempo: 10},
        nota: {ativo: false, tempo: 60},
      }
    };
  }
}
