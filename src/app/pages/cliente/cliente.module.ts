import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { Routes, RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ListarClienteComponent,
  },
  {
    path: 'novo',
    component: NovoClienteComponent,
  },
  {
    path: 'editar/:id',
    component: NovoClienteComponent,
  },
];

@NgModule({
  declarations: [
    ListarClienteComponent,
    NovoClienteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    
  ],
  exports: [RouterModule],
})
export class ClienteModule {}
