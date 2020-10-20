import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoDialogService,
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showAction() {}

  deslogar() {
    localStorage.removeItem('logado');
    this.router.navigate(['/login']);
  }

  title = 'skoll';
  mostrarMenu: boolean;

  profile: PoToolbarProfile = {
    avatar: '../assets/img/user.png',
    subtitle: 'menino_ney@gmail.com',
    title: 'Neymar Jr',
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

  readonly menus: Array<PoMenuItem> = [
    { 
      label: 'Home',
      icon: 'po-icon-home',
      link: '/' },
    {
      label: 'Clientes',
      icon: 'po-icon-user',
      shortLabel: 'Clientes',
      link: 'cliente',
    },
    {
      label: 'Fornecedores',
      icon: 'po-icon-truck',
      shortLabel: 'Fornecedores',
      link: 'fornecedor',
    },
    {
      label: 'Usuários',
      icon: 'po-icon-users',
      shortLabel: 'Usuários',
      link: 'usuario',
    },
    { 
     label: 'Contratos',
     icon: 'po-icon-document-filled',
     link: 'contrato'
    },
    { 
      label: 'Produtos/Serviços',
      icon: 'po-icon po-icon-stock',
      link: 'produto'
     },
     { 
      label: 'Vendedores',
      icon: 'po-icon po-icon-handshake',
      link: 'vendedor'
     },
     { 
      label: 'Formas de Pagamento',
      icon: 'po-icon po-icon-finance',
      link: 'forma-pagamento'
     },
    { 
      label: 'Relatórios', 
      icon: 'po-icon-print',
      link: 'relatorio',
      subItems: [
        {label: 'Vendas por Vendedor'}
      ]
    },
  ];

  openDialog(item: PoToolbarAction) {
    this.poDialog.alert({
      title: 'Bem vindo',
      message: `Seja bem vindo ao sistema de gestão Skoll!`,
      ok: undefined,
    });

    item.type = 'default';
  }

  ngOnInit() {
    this.mostrarMenu = !!localStorage.getItem('logado');
  }

  constructor(private poDialog: PoDialogService, private router: Router) {}
}
