import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./pages/usuario/usuario.module').then((m) => m.UsuarioModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./pages/cliente/cliente.module').then((m) => m.ClienteModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contrato',
    loadChildren: () =>
      import('./pages/contrato/contrato.module').then((m) => m.ContratoModule),
    canActivate: [AuthGuard]
  }, {
    path: 'produto',
    loadChildren: () =>
      import('./pages/produto/produto.module').then((m) => m.ProdutoModule),
    canActivate: [AuthGuard]
  }, {
    path: 'relatorio',
    loadChildren: () =>
      import('./pages/relatorio/relatorio.module').then((m) => m.RelatorioModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'conta-pagar',
    loadChildren: () =>
      import('./pages/conta-pagar/conta-pagar.module').then((m) => m.ContaPagarModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendedor',
    loadChildren: () =>
      import('./pages/vendedor/vendedor.module').then((m) => m.VendedorModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'comissao',
    loadChildren: () =>
      import('./pages/comissao/comissao.module').then((m) => m.ComissaoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'fornecedor',
    loadChildren: () =>
      import('./pages/fornecedor/fornecedor.module').then((m) => m.FornecedorModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forma-pagamento',
    loadChildren: () =>
      import('./pages/forma-pagamento/forma-pagamento.module').then((m) => m.FormaPagamentoModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule { }
