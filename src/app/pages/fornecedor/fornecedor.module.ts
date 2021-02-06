import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoFornecedorComponent } from './novo-fornecedor/novo-fornecedor.component';
import { ListarFornecedorComponent } from './listar-fornecedor/listar-fornecedor.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';


const routes: Routes = [
  {
    path: '',
    component: ListarFornecedorComponent,
  },
  {
    path: 'novo',
    component: NovoFornecedorComponent,
  },
  {
    path: 'editar/:id',
    component: NovoFornecedorComponent,
  }
];

@NgModule({
  declarations: [
    NovoFornecedorComponent,
    ListarFornecedorComponent
  ],
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
export class FornecedorModule { }
