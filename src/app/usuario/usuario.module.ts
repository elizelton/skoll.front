import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoModule } from '@po-ui/ng-components';
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
    component: EditarUsuarioComponent,
  },
];

@NgModule({
  providers: [UsuarioService],
  declarations: [
    ListarUsuarioComponent,
    NovoUsuarioComponent,
    EditarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    PoTemplatesModule,
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsuarioModule {}
