import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./cliente/cliente.module').then((m) => m.ClienteModule),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'contrato',
    loadChildren: () =>
      import('./contrato/contrato.module').then((m) => m.ContratoModule),
  }, {
    path: 'produto',
    loadChildren: () =>
      import('./produto/produto.module').then((m) => m.ProdutoModule),
  }, {
    path: 'relatorio',
    loadChildren: () =>
      import('./relatorio/relatorio.module').then((m) => m.RelatorioModule),
  },
  {
    path: 'conta-pagar',
    loadChildren: () =>
      import('./conta-pagar/conta-pagar.module').then((m) => m.ContaPagarModule),
  },
  {
    path: 'vendedor',
    loadChildren: () =>
      import('./vendedor/vendedor.module').then((m) => m.VendedorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule { }
