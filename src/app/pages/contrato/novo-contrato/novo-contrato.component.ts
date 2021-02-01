import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoNotificationService, PoPageAction, PoTableColumn, PoRadioGroupOption, PoComboOption, PoSelectOption } from '@po-ui/ng-components';
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
    { label: 'Gerar Parcelas' },
    { label: 'Cancelar', url: '/contrato' }
  ];


  private statusSubscription: Subscription;


  @ViewChild('form', { static: true }) form: FormControl;

  person = {};
  validateFields: Array<string> = ['state'];


  columns: PoTableColumn[] = [
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
        { value: 2, color: 'color-11', label: 'Pago', tooltip: 'Situação da parcela' },
        { value: 3, color: 'color-07', label: 'Vencido', tooltip: 'Situação do parcela' }
      ]
    },
    {
      label: 'Comissão',
      property: 'comissao',
      type: 'currency',
      format: 'BRL'
    }
  ]

  items = [{ numParcela: 1, valorParcela: 232.23, dataVencimento: '2020-07-03', dataPagamento: '', situacao: 3, comissao: 23.43 },
  { numParcela: 1, valorParcela: 232.23, dataVencimento: '2020-08-03', dataPagamento: '2020-08-01', situacao: 2, comissao: 23.43 },
  { numParcela: 2, valorParcela: 232.23, dataVencimento: '2020-09-03', dataPagamento: '2020-91-01', situacao: 2, comissao: 23.43 },
  { numParcela: 3, valorParcela: 232.23, dataVencimento: '2020-10-03', dataPagamento: '', situacao: 1, comissao: 23.43 },
  { numParcela: 4, valorParcela: 232.23, dataVencimento: '2020-11-03', dataPagamento: '', situacao: 1, comissao: 23.43 },
  ]

  colProduto: PoTableColumn[] = [
    {
      label: 'Produto',
      property: 'servicoPrestado.produto.nome'
    },
    {
      label: 'Servico',
      property: 'servicoPrestado.nome',
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
    private route: ActivatedRoute
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
  tituloModalCancelamento: string 
  private sub: Subscription;

  tipoDocumentoOptions: PoSelectOption[] = [
    {
      label: "Renovavel", value: 1,
    },
    {
      label: "Único", value: 2
    }
  ]
  tituloPagina
  contrato: Contrato
  ngOnInit() {

    this.contrato = new Contrato()
    this.contrato.cliente = new Cliente()
    this.contrato.cliente.idCliente = 0
    this.contrato.vendedor = new Vendedor()
    this.contrato.formaPagamento = new FormaPagamento()
    this.contrato.formaPagamento.id = 0
    this.contrato.vendedor.id = 0
    this.contrato.dataInicio = new Date()
    this.contrato.dataTermino = new Date()
    this.contrato.observacoes = ""
    this.contrato.valorTotal = 0
    this.contrato.numParcelas = 0
    this.contrato.ativo = true
    this.contrato.periodoMeses = 0
    this.contrato.tipoDocumento = 0
    this.contrato.usuario = new Usuario()
    this.contrato.usuario.id = this.loginService.getUsuarioLogado().id;
    this.contratoServico = new ContratoServico()
    this.contratoServico.servicoPrestado = new ServicoPrestado()
    this.contratoServico.servicoPrestado.id = 0
    this.sub = this.route.params.subscribe(params => {
      this.contrato.id = +params['id'];
      if (this.contrato.id) {
        this.loading = true
        let subService = this.contratoService.get(this.contrato.id).subscribe({
          next: (res: Contrato) => {
            this.contrato = res;
            this.tituloPagina = `Editar Contrato #${res.id}`
            this.contrato.dataInicio = new Date(res.dataInicio)
            this.contrato.dataTermino = new Date(res.dataTermino)
            this.tipoDocumentoOptions = [
              {
                label: "Cancelado", value: 3
              },
              ...this.tipoDocumentoOptions
            ]
            this.carregarContratoServicos()
            subService.unsubscribe()
          }
        })
      }

    });

    let subCliente$ = this.clienteService.getAll()
      .subscribe({
        next: (res: any) => {
          this.clienteOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.idCliente }
          })
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
            return { label: item.nome, value: item.id }
          })
          subFormaPagamento$.unsubscribe();
        }
      })
  }


  salvarContrato() {
    this.contratoService.insert(this.contrato).subscribe()
    if (this.contrato.id) {
      let subService = this.contratoService.update(this.contrato.id, this.contrato).subscribe({
        next: (res: Contrato) => {
          this.poNotification.success('Contrato editado com sucesso!');
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
          subService$.unsubscribe();
        }
      })
    }
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

carregarContratoServicos(){
  let sub = this.contratoServicoService.getByContrato(this.contrato.id)
  .subscribe(
    {
      next: (res: ContratoServico) =>{
        this.itemsContratoServico = res
        sub.unsubscribe()
      }
    }
  )
}

  loadServicos() {
    if (this.produtoSelecionado) {
      let subServicos$ = this.servicoPrestadoService.getByProduto(this.produtoSelecionado)
        .subscribe({
          next: (res: any) => {
            this.servicoOptions = res.map(function (item) {
              return { label: item.nome, value: item.id }
            })
            subServicos$.unsubscribe();
          }
        })
    }
  }

  calcularServico() {
    this.contratoServico.valorTotal = this.contratoServico.quantidade * this.contratoServico.valorUnitario
  }


  adicionarServico() {
    this.contratoServico.idContrato = this.contrato.id
    let sub = this.contratoServicoService.insert(this.contratoServico)
    .subscribe({
      next: () => {
        this.carregarContratoServicos()
        sub.unsubscribe();
      }
    })
  }

  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    return {};
  }

  onLoadFields(value: any) {
    return this.contratoService.getUserDocument(value);
  }
}
