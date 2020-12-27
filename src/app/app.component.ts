import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoDialogService,
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { LoginService } from './pages/login/login.service';
import { Usuario } from './model/Usuario.model';
import menu from './common/menu'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'skoll';
  usuario: Usuario

  constructor(
    private poDialog: PoDialogService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginService.user.subscribe(u => this.usuario = u)
  }

getUsuario(): Usuario {
  return this.usuario
}

  showAction() { }

  deslogar() {
    this.loginService.logout()
    this.router.navigate(['/login']);
  }

  profile: PoToolbarProfile = {
    avatar: '../assets/img/user.png',
    subtitle: this.getUsuario()?.UserName,
    title: this.getUsuario()?.Nome,
  };
  profileActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-user',
      label: 'Dados do Usuario',
      action: (item) => this.showAction(),
    },
    {
      icon: 'po-icon-settings',
      label: 'Configurações',
      action: (item) => this.showAction(),
    },
    {
      icon: 'po-icon-exit',
      label: 'Sair',
      type: 'danger',
      separator: true,
      action: (item) => this.deslogar(),
    },
  ];

  notificationActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-news',
      label: 'PO news, stay tuned!',
      type: 'danger',
      action: (item) => this.onClickNotification(item),
    },
    {
      icon: 'po-icon-message',
      label: 'New message',
      type: 'danger',
      action: (item) => this.openDialog(item),
    },
  ];

  onClickNotification(item: PoToolbarAction) {
    window.open(
      'https://github.com/po-ui/po-angular/blob/master/CHANGELOG.md',
      '_blank'
    );

    item.type = 'default';
  }

  getNotificationNumber() {
    return this.notificationActions.filter((not) => not.type === 'danger')
      .length;
  }

  readonly menus: Array<PoMenuItem> = menu()

  openDialog(item: PoToolbarAction) {
    this.poDialog.alert({
      title: 'Bem vindo',
      message: `Seja bem vindo ao sistema de gestão Skoll!`,
      ok: undefined,
    });

    item.type = 'default';
  }

  ngOnInit() {
  }


}
