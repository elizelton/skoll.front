import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioComponent } from './relatorio.component';
import { RouterModule, Routes } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

const routes: Routes = [
  {
    path: '',
    component: RelatorioComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [RelatorioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RelatorioModule { }
