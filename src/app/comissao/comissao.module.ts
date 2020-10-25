import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComissaoComponent } from './listar-comissao/listar-comissao.component';
import { RouterModule, Routes } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

const routes: Routes = [
  {
    path: '',
    component: ListarComissaoComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [ListarComissaoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
  ],
  exports: [RouterModule],
})
export class ComissaoModule { }
