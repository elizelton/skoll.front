import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { LoginService } from './pages/login/login.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorModule } from './auth/interceptor.module';
import { AuthGuard } from './auth/auth.guard';
import { CidadesService } from './services/cidades.service';
import { ClienteService } from './pages/cliente/cliente.service';
import { TelefoneService } from './services/telefone.service';
import { VendedorService } from './pages/vendedor/vendedor.service';
import { ProdutoService } from './pages/produto/produto.service';
import { ServicoPrestadoService } from './pages/produto/servico-prestado.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule
  ],
  providers: [
    LoginService,
    CidadesService,
    ClienteService,
    TelefoneService,
    VendedorService,
    ProdutoService,
    ServicoPrestadoService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorModule,
      multi: true
    }],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
