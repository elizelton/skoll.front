import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarContratoComponent } from './listar-contrato/listar-contrato.component';
import { NovoContratoComponent } from './novo-contrato/novo-contrato.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ListarContratoComponent,
  },
  {
    path: 'novo',
    component: NovoContratoComponent,
  },
  {
    path: 'editar/:id',
    component: NovoContratoComponent,
  },
];

@NgModule({
  declarations: [ListarContratoComponent, NovoContratoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class ContratoModule { }
