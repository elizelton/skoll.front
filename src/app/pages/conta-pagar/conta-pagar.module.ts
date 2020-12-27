import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarContaPagarComponent } from './listar-conta-pagar/listar-conta-pagar.component';
import { NovoContaPagarComponent } from './novo-conta-pagar/novo-conta-pagar.component';
import { EditarContaPagarComponent } from './editar-conta-pagar/editar-conta-pagar.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';


const routes: Routes = [
  {
    path: '',
    component: ListarContaPagarComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: NovoContaPagarComponent,
    // canActivate: [AuthGuard]
  },
];


@NgModule({
  declarations: [ListarContaPagarComponent, NovoContaPagarComponent, EditarContaPagarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContaPagarModule { }
