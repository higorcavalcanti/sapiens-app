import {Injectable} from '@angular/core';

import { API } from './api';
import { Database } from './database';

@Injectable()
export class Sapiens {

  constructor(private api: API, private database: Database) {
  }

  public login(user, pass) {
    return new Promise((resolve, reject) => {
      this.api.request('login', {user: user, pass: pass}).then((data: any) => {
        console.log('Login', data);
        if(data.logado == true) resolve(true);
        else if(data.hasOwnProperty('erro')) reject(data.erro);
        else reject('Erro desconhecido');
      });
    });
  }

  public logout() {
    return this.database.clear();
  }
}
