import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { Routes, RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ListarUsuarioComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'novo',
    component: NovoUsuarioComponent,
  },
  {
    path: 'editar/:id',
    component: NovoUsuarioComponent,
  },
];


@NgModule({
  declarations: [ListarUsuarioComponent, NovoUsuarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
