import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { RouterModule, Routes } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ListarProdutoComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: NovoProdutoComponent,
  },
  {
    path: 'editar/:id',
    component: NovoProdutoComponent,
  },
];


@NgModule({
  declarations: [ListarProdutoComponent, NovoProdutoComponent, EditarProdutoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
    FormsModule
  ],
  exports: [RouterModule],

})
export class ProdutoModule { }
