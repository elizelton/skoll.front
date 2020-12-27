import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarContratoComponent } from './listar-contrato/listar-contrato.component';
import { NovoContratoComponent } from './novo-contrato/novo-contrato.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

const routes: Routes = [
  {
    path: '',
    component: ListarContratoComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: NovoContratoComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [ListarContratoComponent, NovoContratoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
  ],
  exports: [RouterModule],
})
export class ContratoModule { }
