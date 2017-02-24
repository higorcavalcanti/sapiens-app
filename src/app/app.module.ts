import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { NotasPage } from '../pages/notas/notas';
import { NotasDetalhesPage } from '../pages/notas-detalhes/notas-detalhes';
import { HorariosPage } from '../pages/horarios/horarios';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';

import { API } from '../providers/api';
import { Database } from '../providers/database';
import { Sapiens } from '../providers/sapiens';
import { Notas } from '../providers/notas';
//import { Horarios } from '../providers/horarios';

@NgModule({
  declarations: [
    MyApp,
    ConfiguracoesPage,
    HorariosPage,
    LoginPage,
    NotasPage,
    NotasDetalhesPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConfiguracoesPage,
    HorariosPage,
    LoginPage,
    NotasPage,
    NotasDetalhesPage,
    TabsPage
  ],
  providers: [
    API,
    Database,
    Sapiens,
    Notas,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
