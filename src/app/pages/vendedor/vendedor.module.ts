import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarVendedorComponent } from './listar-vendedor/listar-vendedor.component';
import { NovoVendedorComponent } from './novo-vendedor/novo-vendedor.component';
import { Routes, RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ListarVendedorComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: NovoVendedorComponent,
  },
  {
    path: 'editar/:id',
    component: NovoVendedorComponent,
  },
];


@NgModule({
  declarations: [ListarVendedorComponent, NovoVendedorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VendedorModule { }
