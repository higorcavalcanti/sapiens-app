import {Injectable} from '@angular/core';

import { API } from './api';

@Injectable()
export class Sapiens {

  constructor(private api: API) {
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
}
