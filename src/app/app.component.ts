import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoDialogService,
  PoMenuItem,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { LoginService } from './pages/login/login.service';
import { Usuario } from './model/Usuario.model';
import { RelatorioService } from './services/relatorio.service';
import * as moment from 'moment';
import { ClienteService } from './pages/cliente/cliente.service';
import { VendedorService } from './pages/vendedor/vendedor.service';
import { NgForm } from '@angular/forms';

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
    private loginService: LoginService,
    private relatorioService: RelatorioService,
    private clienteService: ClienteService,
    private poNotification: PoNotificationService,
    private vendedorService: VendedorService,

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
    subtitle: this.getUsuario()?.userName,
    title: this.getUsuario()?.Nome,
  };
  profileActions: Array<PoToolbarAction> = [
    // {
    //   icon: 'po-icon-user',
    //   label: 'Dados do Usuario',
    //   action: (item) => this.showAction(),
    // },
    // {
    //   icon: 'po-icon-settings',
    //   label: 'Configurações',
    //   action: (item) => this.showAction(),
    // },
    {
      icon: 'po-icon-exit',
      label: 'Sair',
      type: 'danger',
      separator: true,
      action: (item) => this.deslogar(),
    },
  ];

  readonly menus: Array<PoMenuItem> = [
    // {
    //     label: 'Home',
    //     icon: 'po-icon-home',
    //     link: '/',
    // },
    {
      label: 'Contas a Pagar',
      icon: 'po-icon po-icon-sale',
      link: 'conta-pagar',
    },
    {
      label: 'Contratos',
      icon: 'po-icon-document-filled',
      link: 'contrato',
    },
    {
      label: 'Comissão',
      icon: 'po-icon po-icon-finance',
      link: 'comissao',
    },
    {
      label: 'Clientes',
      icon: 'po-icon-user',
      shortLabel: 'Clientes',
      link: 'cliente',
    },
    {
      label: 'Formas de Pagamento',
      icon: 'po-icon-credit-payment',
      link: 'forma-pagamento',
    },
    {
      label: 'Fornecedores',
      icon: 'po-icon-truck',
      shortLabel: 'Fornecedores',
      link: 'fornecedor',
    },
    {
      label: 'Produtos/Serviços',
      icon: 'po-icon po-icon-stock',
      link: 'produto',
    },
    {
      label: 'Vendedores',
      icon: 'po-icon po-icon-handshake',
      link: 'vendedor',
    },
    {
      label: 'Relatórios',
      icon: 'po-icon-print',
      subItems: [
        {
          label: 'Parcelas a Pagar',
          action: this.abrirModalParcelaPagar.bind(this)
        },
        {
          label: 'Contrato por cliente',
          action: this.abrirModalContratoPorCliente.bind(this)
        },
        {
          label: 'Contratos por Vendedor',
          action: this.abrirModalContratoPorVendedor.bind(this)
        },
        {
          label: 'Comissão pagas ao vendedor',
          action: this.abrirModalComissaoVendedor.bind(this)
        },
        {
          label: 'Parcelas a receber',
          action: this.abrirModalParcelaReceber.bind(this)
        },
        {
          label: 'Pagamentos e recebimentos de parcelas',
          action: this.abrirModalRelParcelas.bind(this)
        },
        {
          label: 'Vendas Mensais',
          action: this.abrirModalRelVendasMensais.bind(this)
        }
      ]
    },
    {
      label: 'Usuários',
      icon: 'po-icon-users',
      shortLabel: 'Usuários',
      link: 'usuario',
    },
  ];

  @ViewChild('ParcelaAPagarModal') parcelaAPagarModal: PoModalComponent;
  @ViewChild('ContratoPorClienteModal') contratoPorClienteModal: PoModalComponent;
  @ViewChild('ComissaoPagasVendedorModal') comissaoPagasVendedorModal: PoModalComponent;
  @ViewChild('ContratoPorVendedorModal') contratoPorVendedorModal: PoModalComponent;
  @ViewChild('ParcelaReceberModal') parcelaReceberModal: PoModalComponent;
  @ViewChild('RelParcelasModal') relParcelasModal: PoModalComponent;
  @ViewChild('RelVendasMensaisModal') relVendasMensaisModal: PoModalComponent;
  @ViewChild('ComissaoVendedorModal') comissaoVendedorModal: PoModalComponent;
  @ViewChild('ModalForm', { static: true }) parcelaAPagarForm: NgForm;


  dataInicio: any;
  dataAte: any;
  idCliente: number;
  idVendedor: number;
  clienteOptions: any;
  vendedorOptions: any;
  anoSelecionado: number;
  mesSelecionado: number;

  mesOptions = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 },
  ]

  abrirModalParcelaReceber() {
    this.dataAte = new Date()
    this.parcelaReceberModal.open()
  }

  abrirModalComissaoVendedor() {
    this.dataInicio = new Date()
    this.dataAte = moment(new Date()).endOf("month").toDate()
    let subVendedor$ = this.vendedorService.getAll()
      .subscribe({
        next: (res: any) => {
          this.vendedorOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.id }
          })

          this.comissaoVendedorModal.open()
          subVendedor$.unsubscribe();
        }
      })

  }

  abrirModalRelParcelas() {
    this.dataInicio = new Date()
    this.dataAte = moment(new Date()).endOf("month").toDate()
    this.relParcelasModal.open()
  }

  abrirModalRelVendasMensais() {
    this.dataInicio = new Date()
    this.dataAte = moment(new Date()).endOf("month").toDate()
    this.relVendasMensaisModal.open()
  }

  abrirModalParcelaPagar() {
    this.dataAte = new Date()
    this.parcelaAPagarModal.open()
  }

  abrirModalContratoPorCliente() {
    this.dataInicio = new Date()
    this.dataAte = moment(new Date()).endOf("month").toDate()

    let subCliente$ = this.clienteService.getAll()
      .subscribe({
        next: (res: any) => {
          this.clienteOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.idCliente }
          })
          this.contratoPorClienteModal.open()
          subCliente$.unsubscribe();
        }
      })

  }

  


  abrirModalContratoPorVendedor() {
    this.dataInicio = new Date()
    this.dataAte = moment(new Date()).endOf("month").toDate()
    let subVendedor$ = this.vendedorService.getAll()
      .subscribe({
        next: (res: any) => {
          this.vendedorOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.id }
          })

          this.contratoPorVendedorModal.open()
          subVendedor$.unsubscribe();
        }
      })

  }

  ngOnInit() {
  }


  closeModal() {
    this.parcelaAPagarModal.close()
    this.contratoPorClienteModal.close()
    this.contratoPorVendedorModal.close()
    this.parcelaReceberModal.close()
    this.relParcelasModal.close()
    this.comissaoVendedorModal.close()
    this.idCliente = 0
    this.idVendedor = 0
  }

  close: PoModalAction = {
    action: this.closeModal.bind(this),
    label: 'Cancelar',
    danger: true,
  };

  confirmParcelaAPagar: PoModalAction = {
    action: this.gerarRelatorioParcelaPagar.bind(this),
    label: 'Gerar relatório',
  };

  gerarRelatorioParcelaPagar() {
    this.relatorioService.GerarParcelasPagar(moment(this.dataAte).format("YYYY-MM-DD"))
      .subscribe({
        next: (response: any) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: () => {
          this.poNotification.error({message: "Não encontrado resultados.", duration: 6000 });
        }
      }
      )
  }

  confirmContratoPorCliente: PoModalAction = {
    action: this.gerarRelatorioContratoPorCliente.bind(this),
    label: 'Gerar relatório',
  };

  gerarRelatorioContratoPorCliente() {
    this.relatorioService.GerarContratoCliente(
      this.idCliente,
      moment(this.dataInicio).format("YYYY-MM-DD"),
      moment(this.dataAte).format("YYYY-MM-DD"))
      .subscribe({
        next: (response: any) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: () => {
          this.poNotification.error({message: "Não encontrado resultados.", duration: 6000 })
        }
      })
  }

  confirmContratoPorVendedor: PoModalAction = {
    action: this.gerarRelatorioContratoPorVendedor.bind(this),
    label: 'Gerar relatório',
  };

  gerarRelatorioContratoPorVendedor() {
    this.relatorioService.GerarContratoVendedor(
      this.idVendedor,
      moment(this.dataInicio).format("YYYY-MM-DD"),
      moment(this.dataAte).format("YYYY-MM-DD"))
      .subscribe({
        next: (response: any) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: () => {
          this.poNotification.error({message: "Não encontrado resultados.", duration: 6000 })
        }
      })
  }

  confirmComissaoPagasVendedor: PoModalAction = {
    action: this.gerarRelatorioconfirmComissaoPagasVendedor.bind(this),
    label: 'Gerar relatório',
  };

  gerarRelatorioconfirmComissaoPagasVendedor() {
    this.relatorioService.GerarContratoVendedor(
      this.idVendedor,
      moment(this.dataInicio).format("YYYY-MM-DD"),
      moment(this.dataAte).format("YYYY-MM-DD"))
      .subscribe({
        next: (response: any) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: () => {
          this.poNotification.error({message: "Não encontrado resultados.", duration: 6000 })
        }
      })
  }

  confirmParcelaAReceber: PoModalAction = {
    action: this.gerarRelatorioParcelaReceber.bind(this),
    label: 'Gerar relatório',
  };

  gerarRelatorioParcelaReceber() {
    this.relatorioService.GerarParcelasVencer(moment(this.dataAte).format("YYYY-MM-DD"))
      .subscribe({
        next: (response: any) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: () => {
          this.poNotification.error({message: "Não encontrado resultados.", duration: 6000 })
        }
      }
      )
  }



  confirmRelParcelas: PoModalAction = {
    action: this.gerarRelatorioRelParcelas.bind(this),
    label: 'Gerar relatório',
  };

  gerarRelatorioRelParcelas() {
    this.relatorioService.GerarRelParcelas(
      moment(this.dataInicio).format("YYYY-MM-DD"),
      moment(this.dataAte).format("YYYY-MM-DD")
    )
      .subscribe({
        next: (response: any) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: () => {
          this.poNotification.error({message: "Não encontrado resultados.", duration: 6000 })
        }
      }
      )
  }



  confirmRelVendasMensaisModal: PoModalAction = {
    action: this.gerarVendasMensais.bind(this),
    label: 'Gerar relatório',
  };

  gerarVendasMensais() {
    this.relatorioService.GerarContratoMes(
     this.mesSelecionado,
     this.anoSelecionado)
      .subscribe({
        next: (response: any) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: () => {
          this.poNotification.error({message: "Não encontrado resultados.", duration: 6000 })
        }
      })
  }

  confirmComissaoVendedorModal: PoModalAction = {
    action: this.gerarComissaoVendedor.bind(this),
    label: 'Gerar relatório',
  };

  gerarComissaoVendedor() {
    this.relatorioService.GerarComissaoVendedor(
      this.idVendedor,
      moment(this.dataInicio).format("YYYY-MM-DD"),
      moment(this.dataAte).format("YYYY-MM-DD"))
      .subscribe({
        next: (response: any) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: () => {
          this.poNotification.error({message: "Não encontrado resultados.", duration: 6000 })
        }
      })
  }


}
