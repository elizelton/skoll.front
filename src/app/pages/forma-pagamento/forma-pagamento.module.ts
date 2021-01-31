import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarFormaPagamentoComponent } from './listar-forma-pagamento/listar-forma-pagamento.component';
import { NovoFormaPagamentoComponent } from './novo-forma-pagamento/novo-forma-pagamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListarFormaPagamentoComponent,
  },
  {
    path: 'novo',
    component: NovoFormaPagamentoComponent,
  },
  {
    path: 'editar/:id',
    component: NovoFormaPagamentoComponent,
  }
];

@NgModule({
  declarations: [ListarFormaPagamentoComponent, NovoFormaPagamentoComponent],
  imports: [
    CommonModule,
    PoModule,
    PoTemplatesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class FormaPagamentoModule { }
