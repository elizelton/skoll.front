import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PoBreadcrumb, PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoNotificationService, PoPageAction, PoTableColumn, PoRadioGroupOption } from '@po-ui/ng-components';
import { of, Subscription } from 'rxjs';
import { ContratoService } from '../contrato.service';

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
    { label: 'Salvar', url: '' },
    { label: 'Gerar Parcelas' },
    { label: 'Cancelar', url: '/contrato' }
  ];

  address: string;
  cardNumber: string;
  cardType: string;
  city: string;
  country: string;
  name: string;
  phoneNumber: string;
  securityCode: string;
  stateProvince: string;
  zipPostalCode: string;

  private statusSubscription: Subscription;

  readonly produtoOptions: Array<PoRadioGroupOption> = [
    { label: 'Produto 1', value: 1 },
    { label: 'Produto 2', value: 2 },
    { label: 'Produto 3', value: 3 },
    { label: 'Produto 4', value: 4 }
  ];

  readonly subProdutoOptions: Array<PoRadioGroupOption> = [
    { label: 'SubProduto 1', value: 1 },
    { label: 'SubProduto 2', value: 2 },
    { label: 'SubProduto 3', value: 3 },
    { label: 'SubProduto 4', value: 4 },
  ];

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
      property: 'produto'
    },
    {
      label: 'SubProduto',
      property: 'subProduto',
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
      property: 'columnIcon', label: ' ', type: 'icon', width: '100px', action: console.log, icons: [
        { value: 'delete', icon: 'po-icon-plus', color: 'color-06', action: console.log, tooltip: 'Adiciona um novo item' },
        { value: 'edit', icon: 'po-icon-edit', action: console.log },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-12', action: console.log }
      ]
    },
  ]

  itemsProduto = [
    { subProduto: 'Subproduto 1', produto: 'Produto 1', quantidade: 3, valorUnitario: 232.32, columnIcon: ['po-icon-edit', 'po-icon-delete'] },
    { subProduto: 'Subproduto 1', produto: 'Produto 2', quantidade: 2, valorUnitario: 34.38, columnIcon: ['po-icon-edit', 'po-icon-delete'] }
  ]

  constructor(public poNotification: PoNotificationService, private contratoService: ContratoService) { }

  ngOnInit() {
    this.person = {};
  }

  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    return {};
  }

  onLoadFields(value: any) {
    return this.contratoService.getUserDocument(value);
  }
}
