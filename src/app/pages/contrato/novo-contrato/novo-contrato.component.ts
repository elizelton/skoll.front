import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoNotificationService, PoPageAction, PoTableColumn, PoRadioGroupOption, PoComboOption, PoSelectOption, PoDialogService, PoModalComponent, PoModalAction, PoTableAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/model/Cliente.model';
import { Contrato } from 'src/app/model/Contrato.model';
import { ContratoServico } from 'src/app/model/ContratoServico.model';
import { FormaPagamento } from 'src/app/model/FormaPagamento.model';
import { ServicoPrestado } from 'src/app/model/ServicoPrestado.model';
import { Usuario } from 'src/app/model/Usuario.model';
import { Vendedor } from 'src/app/model/Vendedor.model';
import { ClienteService } from '../../cliente/cliente.service';
import { FormaPagamentoService } from '../../forma-pagamento/forma-pagamento.service';
import { LoginService } from '../../login/login.service';
import { ProdutoService } from '../../produto/produto.service';
import { ServicoPrestadoService } from '../../produto/servico-prestado.service';
import { VendedorService } from '../../vendedor/vendedor.service';
import { ContratoService } from '../contrato.service';
import { ContratoParcelaService } from '../contratoParcela.service';
import { ContratoParcelaPagamentoService } from '../contratoParcelaPagamento.service';
import { ContratoServicoService } from '../ContratoServicoService.service';
import * as moment from 'moment';
import { ContratoParcela } from 'src/app/model/ContratoParcela.model';
import { ContratoParcelaPagamento } from 'src/app/model/ContratoParcelaPagamento.model';

@Component({
  selector: 'app-novo-contrato',
  templateUrl: './novo-contrato.component.html',
  styleUrls: ['./novo-contrato.component.css']
})
export class NovoContratoComponent implements OnInit {


  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Contratos', link: '/contrato' }, { label: 'Novo' }]
  };

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvarContrato.bind(this) },
    { label: 'Voltar', url: '/contrato', type: 'danger' },
    { label: 'Gerar Parcelas', action: this.gerarParcelasContratoModal.bind(this), disabled: true },
    { label: 'Cancelar Contrato', action: this.gerarParcelasContratoModal.bind(this), disabled: true },

  ];


  private statusSubscription: Subscription;


  @ViewChild('form', { static: true }) form: FormControl;

  person = {};
  validateFields: Array<string> = ['state'];


  parcelasColumns: PoTableColumn[] = [
    {
      label: 'Número',
      property: 'numParcela',
      type: 'number'
    },
    {
      label: 'Valor',
      property: 'valorParcela',
      type: 'currency',
      format: 'BRL'
    }, {
      label: 'Data Vencimento',
      property: 'dataVencimento',
      type: 'date'
    },
    {
      label: 'Data Pagamento',
      property: 'dataPagamento',
      type: 'date'
    },
    {
      label: 'Situação',
      property: 'situacao',
      type: 'label',
      labels: [
        { value: 1, color: 'color-08', label: 'Pendente', tooltip: 'Situação da parcela' },
        { value: 3, color: 'color-11', label: 'Pago', tooltip: 'Situação da parcela' },
        { value: 2, color: 'color-03', label: 'Pago Parcialmente', tooltip: 'Situação do parcela' }
      ]
    },
    {
      label: 'Comissão',
      property: 'comissao',
      type: 'currency',
      format: 'BRL'
    }
  ]

  PagamentosColumns: PoTableColumn[] = [
    {
      label: 'Número',
      property: 'id',
      type: 'number'
    },
    {
      label: 'Valor Pago',
      property: 'valorPagamento',
      type: 'currency',
      format: 'BRL'
    }, {
      label: 'Juros',
      property: 'juros',
      type: 'currency',
      format: 'BRL'
    },
    {
      label: 'Data Pagamento',
      property: 'dataPagamento',
      type: 'date'
    },
    {
      label: 'Comissão',
      property: 'comissao',
      type: 'currency',
      format: 'BRL'
    }
  ]

  colProduto: PoTableColumn[] = [
    {
      label: 'Produto',
      property: 'produtoNome'
    },
    {
      label: 'Servico',
      property: 'servicoNome',
    },
    {
      label: 'Quantidade',
      property: 'quantidade',
      type: 'number'
    },
    {
      label: 'Valor Unitário',
      property: 'valorUnitario',
      type: 'currency',
      format: 'BRL'
    },
    {
      label: 'Valor Total',
      property: 'valorTotal',
      type: 'currency',
      format: 'BRL'
    },
    {
      property: 'columnIcon', label: ' ', type: 'icon', width: '100px', action: console.log, icons: [
        { value: 'delete', icon: 'po-icon-plus', color: 'color-06', action: console.log, tooltip: 'Adiciona um novo item' },
        { value: 'edit', icon: 'po-icon-edit', action: console.log },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-12', action: console.log }
      ]
    },
  ]

  constructor(
    public poNotification: PoNotificationService,
    private contratoService: ContratoService,
    private contratoParcelaService: ContratoParcelaService,
    private contratoParcelaPagamentoService: ContratoParcelaPagamentoService,
    private contratoServicoService: ContratoServicoService,
    private clienteService: ClienteService,
    private vendedorService: VendedorService,
    private formaPagamentoService: FormaPagamentoService,
    private produtoService: ProdutoService,
    private servicoPrestadoService: ServicoPrestadoService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private poDialog: PoDialogService
  ) { }
  clienteOptions: any
  vendedorOptions: any
  formaPagamentoOptions: any
  produtoOptions: any
  servicoOptions: any
  produtoSelecionado = 0
  contratoServico: ContratoServico
  itemsContratoServico: any
  loading = false
  tituloPagina
  contrato: Contrato
  tituloModalCancelamento: string
  tituloModalGerarParcela: string
  parcelasItems
  tituloModalPagarParcela = "Novo Pagamento de Parcela"
  gerarParcelasOptions = { isPrimeira: true, diaVencimento: null }
  hoje = new Date()
  private sub: Subscription;

  tipoDocumentoOptions: PoSelectOption[] = [
    {
      label: "Renovavel", value: 1,
    },
    {
      label: "Único", value: 2
    }
  ]

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;


  ngOnInit() {

    this.contrato = new Contrato()
    this.contrato.cliente = new Cliente()
    this.contrato.cliente.idCliente = 0
    this.contrato.vendedor = new Vendedor()
    this.contrato.formaPagamento = new FormaPagamento()
    this.contrato.formaPagamento.id = 0
    this.contrato.vendedor.id = 0
    this.contrato.dataInicio = new Date()
    this.contrato.dataTermino = moment(this.contrato.dataInicio).add(1, 'months').toDate()
    this.contrato.observacoes = ""
    this.contrato.valorTotal = 0
    this.contrato.numParcelas = null
    this.contrato.ativo = true
    this.contrato.periodoMeses = 1
    this.contrato.tipoDocumento = 0
    this.contrato.qntdExemplares = 0
    this.contrato.juros = 0
    this.contrato.usuario = new Usuario()
    this.contrato.usuario.id = this.loginService.getUsuarioLogado().id;
    this.contratoServico = new ContratoServico()
    this.contratoServico.servicoPrestado = new ServicoPrestado()
    this.contratoServico.servicoPrestado.id = 0
    this.parcelaModal = new ContratoParcela()
    this.parcelaModal.dataVencimento = new Date()
    this.parcelaModal.valorParcela = 0;
    let subCliente$ = this.clienteService.getAll()
      .subscribe({
        next: (res: any) => {
          this.clienteOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.idCliente }
          })
          this.contrato.cliente.idCliente = this.contrato.cliente.idCliente
          subCliente$.unsubscribe();
        }
      })
    let subVendedor$ = this.vendedorService.getAll()
      .subscribe({
        next: (res: any) => {
          this.vendedorOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.id }
          })
          subVendedor$.unsubscribe();
        }
      })
    let subFormaPagamento$ = this.formaPagamentoService.getAll()
      .subscribe({
        next: (res: any) => {
          this.formaPagamentoOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.id, qtdParcela: item.qtdParcela }
          })
          subFormaPagamento$.unsubscribe();
        }
      })

    this.sub = this.route.params.subscribe(params => {
      this.contrato.id = +params['id'];
      if (this.contrato.id) {
        this.loading = true
        let subService = this.contratoService.get(this.contrato.id).subscribe({
          next: (res: Contrato) => {
            this.contrato = res;
            this.tituloPagina = `Editar Contrato #${res.id}`
            this.breadcrumb.items[2].label = "Editar"
            this.contrato.dataInicio = new Date(res.dataInicio)
            this.contrato.dataTermino = new Date(res.dataTermino)
            this.tipoDocumentoOptions = [
              {
                label: "Cancelado", value: 3
              },
              ...this.tipoDocumentoOptions
            ]
            this.actions[2].disabled = false;
            this.carregarContratoServicos()
            this.getContratoParcelas()
            subService.unsubscribe()
          }
        })
      }

    });
  }

  carregarNumParcelas() {
    if (this.contrato.formaPagamento.id && !this.contrato.numParcelas)
      this.contrato.numParcelas = this.formaPagamentoOptions
        .find(x => x.value == this.contrato.formaPagamento.id)?.qtdParcela
  }

  salvarContrato() {
    this.contratoService.insert(this.contrato).subscribe()
    if (this.contrato.id) {
      let subService = this.contratoService.update(this.contrato.id, this.contrato).subscribe({
        next: (res: Contrato) => {
          this.poNotification.success('Contrato editado com sucesso!');
          this.actions[2].disabled = false;
          subService.unsubscribe();
        }
      })
    }
    else {
      this.contrato.id = this.contrato.id || 0
      let subService$ = this.contratoService.insert(this.contrato).subscribe({
        next: (res: Contrato) => {
          this.contrato.id = res.id;
          this.tituloPagina = `Editar Contrato #${res.id}`
          this.poNotification.success('Contrato criado com sucesso!');
          this.actions[2].disabled = false;
          subService$.unsubscribe();
        }
      })
    }
  }

  calcularData() {
    if (this.contrato.periodoMeses)
      this.contrato.dataTermino = moment(this.contrato.dataInicio).add(this.contrato.periodoMeses, 'months').toDate()
  }

  carregarDadosProdutos() {
    let subProdutos$ = this.produtoService.getProdutoComServico()
      .subscribe({
        next: (res: any) => {
          this.produtoOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.id }
          })
          subProdutos$.unsubscribe();
        }
      })
  }

  getContratoParcelas() {
    this.contratoParcelaService.getParcelas(this.contrato.id)
      .subscribe({
        next: (res: any[]) => {
          if (res.length)
            this.parcelasItems = res
          else
            this.actions[2].disabled = true;
        }
      })
  }

  carregarContratoServicos() {
    let sub = this.contratoServicoService.getByContrato(this.contrato.id)
      .subscribe(
        {
          next: (res: any) => {
            this.itemsContratoServico = res.map(function (item) {
              return { produtoNome: item.servicoPrestado.produto.nome, servicoNome: item.servicoPrestado.nome, ...item }
            })
            sub.unsubscribe()
          }
        }
      )
  }

  loadServicos(servicoId: number) {
    debugger
    if (this.produtoSelecionado) {
      let subServicos$ = this.servicoPrestadoService.getByProduto(this.produtoSelecionado)
        .subscribe({
          next: (res: any) => {
            this.servicoOptions = res.map(function (item) {
              return { label: item.nome, value: item.id, valorUnitario: item.valorUnitario }
            })
            if (servicoId) {
              this.contratoServico.servicoPrestado.id = servicoId
            }
            subServicos$.unsubscribe();
          }
        })
    }
  }

  calcularServico() {
    this.contratoServico.valorTotal = this.contratoServico.quantidade * this.contratoServico.valorUnitario
  }

  readonly actionsProduto: Array<PoTableAction> = [
    {
      action: this.editarServico.bind(this),
      icon: 'po-icon-edit',
      label: 'Editar'
    },
    {
      action: this.excluirServico.bind(this),
      icon: 'po-icon-delete',
      label: 'Excluir'
    }
  ];

  editarServico(servico) {
    this.contratoServico = servico;
    //  this.contratoServico.servicoPrestado.id = 0
    this.contratoServico.id = null
    this.servicoPrestadoService.get(servico.servicoPrestado.id)
      .subscribe({
        next: (res: ServicoPrestado) => {
          this.produtoSelecionado = res.produto.id
          this.loadServicos(servico.servicoPrestado.id)
        }
      })
  }

  excluirServico() {

  }

  adicionarServico() {
    this.contratoServico.idContrato = this.contrato.id
    let sub = this.contratoServicoService.insert(this.contratoServico)
      .subscribe({
        next: () => {
          this.carregarContratoServicos()
          this.poNotification.success("Serviço adicionado com sucesso.")
          this.actions[1].disabled = false;
          sub.unsubscribe();
        }
      })
  }

  readonly actionsParcelas: Array<PoTableAction> = [
    {
      action: this.lancarPagamentoParcela.bind(this),
      icon: 'po-icon-finance',
      label: 'Lançar Pagamento',
    }
  ];

  @ViewChild('modalLancarParcela') modalLancarParcela: PoModalComponent;
  parcelaModal: ContratoParcela
  parcelaPagamento: ContratoParcelaPagamento = { dataPagamento: new Date(), valorPagamento: 0 }
  valorMaximoPagamento = 0
  lancarPagamentoParcela(parcela) {
    this.parcelaModal = new ContratoParcela()
    this.parcelaModal = parcela
    this.tituloModalPagarParcela = `Novo Pagamento de Parcela#${parcela.id}`

    this.valorMaximoPagamento = parcela.valorParcela

    this.parcelaPagamento.idContratoParcela = parcela.id
    this.parcelaModal.dataVencimento = new Date(parcela.dataVencimento)
    this.modalLancarParcela.open()
  }

  validaValorParcela() {
    if (this.parcelaPagamento.valorPagamento
      && this.parcelaPagamento.valorPagamento > 0
      && this.parcelaPagamento.valorPagamento <= this.valorMaximoPagamento)
      this.confirmPagarParcela.disabled = false
    else
      this.confirmPagarParcela.disabled = true
  }

  contemPagamentos(row, index: number) {
    return row.pagamentos.length > 0;
  }

  close: PoModalAction = {
    action: this.closeModal.bind(this),
    label: 'Cancelar',
    danger: true,
  };

  confirmGerarParcela: PoModalAction = {
    action: this.gerarParcelaConfirmacao.bind(this),
    label: 'Gerar parcelas',
    disabled: true,
    loading: this.loading
  };

  confirmPagarParcela: PoModalAction = {
    action: this.pagarParcelaConfirmacao.bind(this),
    label: 'Realizar Pagamento',
    disabled: true,
    loading: this.loading
  };

  closeModal() {
    this.poModal.close();
    this.modalLancarParcela.close();
  }

  pagarParcelaConfirmacao() {
    this.contratoParcelaPagamentoService.insert(this.parcelaPagamento)
      .subscribe({
        next: () => {
          this.poNotification.success('Parcela paga com sucesso!')
          this.closeModal()
          this.getContratoParcelas()
        }
      })
  }

  gerarParcelaConfirmacao() {
    this.contratoService.gerarParcelas(
      this.contrato.id,
      this.gerarParcelasOptions.diaVencimento,
      this.gerarParcelasOptions.isPrimeira)
      .subscribe({
        next: () => {
          this.poNotification.success('Parcelas geradas com sucesso!')
          this.closeModal()
          this.getContratoParcelas()
        }
      })
  }

  carregarValorUnitario() {
    this.contratoServico.valorUnitario = this.servicoOptions
      .find(x => x.id = this.contratoServico.servicoPrestado.id)?.valorUnitario
  }

  validarDia() {
    if (this.gerarParcelasOptions.diaVencimento > 0 && this.gerarParcelasOptions.diaVencimento < 31)
      this.confirmGerarParcela.disabled = false
    else
      this.confirmGerarParcela.disabled = true;

  }

  gerarParcelasContratoModal() {
    this.tituloModalGerarParcela = `Gerar Parcelas Contrato#${this.contrato.id}`
    this.poModal.open();
  }

}
