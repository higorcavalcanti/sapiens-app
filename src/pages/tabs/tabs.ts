import { Component } from '@angular/core';

import { NotasPage } from '../notas/notas';
import { HorariosPage } from '../horarios/horarios';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = NotasPage;
  tab2Root: any = HorariosPage;
  tab3Root: any = ConfiguracoesPage;

  constructor() {
  }
}
