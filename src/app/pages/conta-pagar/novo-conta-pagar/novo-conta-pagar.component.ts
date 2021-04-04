import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoDialogService, PoModalAction, PoModalComponent, PoNotification, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { ContaPagar } from 'src/app/model/ContaPagar.model';
import { ContaPagarParcela } from 'src/app/model/ContaPagarParcela.model';
import { ContaPagarParcelaPagamento } from 'src/app/model/ContaPagarParcelaPagamento.model';
import { Fornecedor } from 'src/app/model/Fornecedor.model';
import { FornecedorService } from '../../fornecedor/fornecedor.service';
import { ContaPagarParcelaPagamentoService } from '../conta-pagar-parcela-pagamento.service';
import { ContaPagarParcelaService } from '../conta-pagar-parcela.service';
import { ContaPagarService } from '../conta-pagar.service';

@Component({
  selector: 'app-novo-conta-pagar',
  templateUrl: './novo-conta-pagar.component.html',
  styleUrls: ['./novo-conta-pagar.component.css']
})
export class NovoContaPagarComponent implements OnInit {

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Contas a Pagar', link: '/conta-pagar' }, { label: 'Novo' }]
  };

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvarContaPagar.bind(this) },
    { label: 'Voltar', url: '/conta-pagar', type: 'danger' },
    { label: 'Gerar Parcelas', action: this.gerarParcelasContaPagar.bind(this), disabled: true },
    { label: 'Gerar Parcela de Ajuste', action: this.gerarParcelasAjuste.bind(this), disabled: true },
  ];


  gerarParcelasModal() {

  }

  gerarParcelasAjuste(){
    this.tituloModalPagarParcelaAjuste = `Conta a pagar#${this.contaPagar.id} - Gerar parcala de ajuste`
    this.parcelaAjuste.dataVencimento=new Date()
    this.parcelaAjuste.valorDif = 0
    this.modalLancarParcelaAjuste.open()
  }

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
    },
    {
      label: 'Valor Ajuste',
      property: 'ajuste',
      type: 'currency',
      format: 'BRL'
    },
     {
      label: 'Data Vencimento',
      property: 'dataVencimento',
      type: 'date'
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

  contemPagamentos(row, index: number) {
    return row.pagamentos.length > 0;
  }

  forncedorOptions: any[]
  parcelasItems: any[]
  tituloPagina: string = "Nova Conta a Pagar"
  tituloModalGerarParcela: string
  loading = false
  parcelaModal
  tituloModalPagarParcela
  tituloModalPagarParcelaAjuste
  pagamentoMensal= false
  parcelaPagamento: ContaPagarParcelaPagamento = { dataPagamento: new Date(), valorPagamento: 0 }
  hoje = new Date()
  parcelaAjuste= {dataVencimento: new Date(), valorDif: 0}
  private sub: Subscription;


  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private poDialog: PoDialogService,
    private contaPagarService: ContaPagarService,
    private contaPagarParcelaService: ContaPagarParcelaService,
    private contaPagarParcelaPagamentoService: ContaPagarParcelaPagamentoService,
    private poNotification: PoNotificationService
  ) {
    this.contaPagar = new ContaPagar()
    this.contaPagar.ajuste = 0
    this.contaPagar.ativo = true
    this.contaPagar.dataTermino = new Date()
    this.contaPagar.diaInicial = 1
    this.contaPagar.fornecedor = new Fornecedor()
    this.contaPagar.fornecedor.id = 0
    this.contaPagar.id = 0
    this.contaPagar.juros = 0
    this.contaPagar.mesInicial = 0
    this.contaPagar.numParcelas = 0
    this.contaPagar.observacoes = ""
    this.contaPagar.diasPagamento = ""
    this.parcelaModal = new ContaPagarParcela()
    this.parcelaModal.dataVencimento = new Date()
    this.parcelaModal.valorParcela = 0;
    
    this.loading = true
    let subFornecedor$ = this.fornecedorService.getAll()
      .subscribe({
        next: (res: any) => {
          this.forncedorOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.idFornecedor }
          })
          this.loading = false
          subFornecedor$.unsubscribe();

          this.sub = this.route.params.subscribe(params => {
            this.contaPagar.id = +params['id'];
            if (this.contaPagar.id) {
              this.loading = true
              let subService = this.contaPagarService.get(this.contaPagar.id).subscribe({
                next: (res: ContaPagar) => {
                  this.contaPagar = res;
                  this.tituloPagina = `Editar Conta a Pagar #${res.id}`
                  this.breadcrumb.items[2].label = "Editar"
                 
                  if(res.valorMensal > 0)
                    this.pagamentoMensal = true
                 
                    this.contaPagar.dataTermino = new Date(res.dataTermino)
                  this.actions[2].disabled = false;
                  this.actions[3].disabled = false;
                  this.getContaPagarParcelas()
                  subService.unsubscribe()
                  this.loading = false
                }
              })
            }
          });
        }
      })


  }

  contaPagar: ContaPagar
  ngOnInit(): void {
  }

  readonly actionsParcelas: Array<PoTableAction> = [
    {
      action: this.lancarPagamentoParcela.bind(this),
      icon: 'po-icon-finance',
      label: 'Lançar Pagamento',
    }
  ]

  @ViewChild('modalLancarParcela') modalLancarParcela: PoModalComponent;
  @ViewChild('modalLancarParcelaAjuste') modalLancarParcelaAjuste: PoModalComponent;

  confirmPagarParcela: PoModalAction = {
    action: this.pagarParcelaConfirmacao.bind(this),
    label: 'Realizar Pagamento',
    disabled: true,
    loading: this.loading
  };

  confirmPagarParcelaAjuste: PoModalAction = {
    action: this.pagarParcelaAjusteConfirmacao.bind(this),
    label: 'Adicionar parcela',
    loading: this.loading
  };


  close: PoModalAction = {
    action: this.closeModal.bind(this),
    label: 'Cancelar',
    danger: true,
  };

  pagarParcelaConfirmacao() {
    this.contaPagarParcelaPagamentoService.insert(this.parcelaPagamento)
      .subscribe({
        next: () => {
          this.poNotification.success('Parcela paga com sucesso!')
          this.closeModal()
          this.getContaPagarParcelas()
        }
      })
  }

  pagarParcelaAjusteConfirmacao() {
    this.contaPagarService.gerarParcelaAjuste(
      this.contaPagar.id,
       this.parcelaAjuste.valorDif,
        this.parcelaAjuste.dataVencimento)
      .subscribe({
        next: () => {
          this.poNotification.success('Parcela de ajuste gerada sucesso!')
          this.closeModal()
          this.getContaPagarParcelas()
        }
      })
  }


  validaValorParcela() {
    if (this.parcelaPagamento.valorPagamento
      && this.parcelaPagamento.valorPagamento > 0
      && this.parcelaPagamento.valorPagamento <= this.valorMaximoPagamento)
      this.confirmPagarParcela.disabled = false
    else
      this.confirmPagarParcela.disabled = true
  }

  valorMaximoPagamento

  lancarPagamentoParcela(parcela) {
    this.parcelaModal = new ContaPagarParcela()
    this.parcelaModal = parcela
    this.tituloModalPagarParcela = `Conta a pagar#${this.contaPagar.id} - Novo Pagamento de Parcela#${parcela.id}`

    if(parcela.valorParcela == 0){
      parcela.valorParcela = parcela.ajuste
    }
    this.valorMaximoPagamento = parcela.valorParcela


    this.parcelaPagamento.idContaPagarParcela = parcela.id

    this.parcelaModal.dataVencimento = new Date(parcela.dataVencimento)
    this.modalLancarParcela.open()
  }

  salvarContaPagar() {
    this.contaPagarService.insert(this.contaPagar).subscribe()
    if (this.contaPagar.id) {
      let subService = this.contaPagarService.update(this.contaPagar.id, this.contaPagar).subscribe({
        next: (res: ContaPagar) => {
          this.poNotification.success('Conta pagar editada com sucesso!');
          this.actions[2].disabled = false;
          subService.unsubscribe();
        }
      })
    }
    else {
      this.contaPagar.id = this.contaPagar.id || 0
      let subService$ = this.contaPagarService.insert(this.contaPagar).subscribe({
        next: (res: ContaPagar) => {
          this.contaPagar.id = res.id;
          this.tituloPagina = `Editar ContaPagar #${res.id}`
          this.poNotification.success('Conta a pagar criada com sucesso!');
          this.actions[2].disabled = false;
          this.breadcrumb.items[2].label = "Editar"
          this.actions[3].disabled = false;
          subService$.unsubscribe();
        }
      })
    }
  }

  getContaPagarParcelas() {
    this.contaPagarParcelaService.getContaPagar(this.contaPagar.id)
      .subscribe({
        next: (res: any[]) => {
          if (res.length)
            this.parcelasItems = res
          else
            this.actions[2].disabled = true;
        }
      })
  }


  gerarParcelasContaPagar() {

    this.poDialog.confirm({
      title: "Confirmar processo",
      message: `Deseja gerar as parcelas da <strong>conta a pagar #${this.contaPagar.id}</strong>?`,
      confirm: () => {
        this.contaPagarService.gerarParcelas(
          this.contaPagar.id)
          .subscribe(
            () => {
              this.poNotification.success('Parcelas geradas com sucesso!')
              this.getContaPagarParcelas()
            }
          )
      },
      cancel: () => { undefined }
    })
  }

  closeModal() {
    this.modalLancarParcela.close();
    this.modalLancarParcelaAjuste.close();
  }
}
