import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PoBreadcrumb, PoModalAction, PoModalComponent, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-listar-comissao',
  templateUrl: './listar-comissao.component.html',
  styleUrls: ['./listar-comissao.component.css']
})
export class ListarComissaoComponent implements OnInit {

  @ViewChild('pagamentoModal') pagamentoModal: PoModalComponent;

  total = 0;
  totalCount = 0;
  columns: Array<PoTableColumn> = [
    { property: 'contratoId', label: 'Contrato', type: 'number', width: '8%' },
    { property: 'cliente', label: 'Cliente', width: '30%' },
    { property: 'vendedor', label: 'Vendedor', width: '30%' },
    { property: 'dataPagamento', label: 'Data de Pagamento', width: '10%' },
    { property: 'totalComissao', label: 'Total de Comissão', width: '10%', type: 'currency', format: 'BRL' },
    {
      property: 'situacao',
      type: 'label',
      label: 'Situação',
      width: '10%',
      labels: [
        { value: 0, color: 'color-08', label: 'Pendente' },
        { value: 1, color: 'color-11', label: 'Pago' },
      ]
    }];

  closeModal() {
    this.pagamentoModal.close();
  }


  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      { }
    },
    label: 'Salvar'
  };

  decreaseTotal(row: any) {
    if (row.totalComissao) {
      this.total -= row.totalComissao;
    }
    this.totalCount--;
  }

  sumTotal(row: any) {
    if (row.totalComissao) {
      this.total += row.totalComissao;
    }
    this.totalCount++;
  }
  items: Array<any> = [
    {
      "contratoId": 1,
      "cliente": "Bryan Sérgio Pires",
      "dataPagamento": "",
      "vendedor": "pele",
      "totalComissao": 232.32,
      "situacao": 0
    },
    {
      "contratoId": 2,
      "cliente": "Jose das coves",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 232.32,
      "situacao": 0
    },
    {
      "contratoId": 3,
      "cliente": "Fernando Pereira",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 232.32,
      "situacao": 0
    },
    {
      "contratoId": 4,
      "cliente": "Bruno Ferreira Silva",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 243.32,
      "situacao": 0
    },
    {
      "contratoId": 5,
      "cliente": "Amanda Maria Nunes",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 42.32,
      "situacao": 0
    },
    {
      "contratoId": 6,
      "cliente": "Beatriz Silva",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 532.34,
      "situacao": 0
    },
    {
      "contratoId": 7,
      "cliente": "Jose das Coves",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 123.33,
      "situacao": 0
    },
    {
      "contratoId": 8,
      "cliente": "Fulano de Tal",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 232.32,
      "situacao": 0
    },
    {
      "contratoId": 9,
      "cliente": "Beltrano de Tal",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 233,
      "situacao": 0
    },
    {
      "contratoId": 10,
      "cliente": "Bryan Sérgio Pires",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 343,
      "situacao": 0
    },
    {
      "contratoId": 11,
      "cliente": "Sicrano de Tal",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 232.32,
      "situacao": 0
    },
    {
      "contratoId": 12,
      "cliente": "Bryan Sérgio Pires",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 523,
      "situacao": 0
    },
    {
      "contratoId": 13,
      "cliente": "Mario Bros",
      "vendedor": "pele",
      "dataPagamento": "",
      "totalComissao": 1232,
      "situacao": 0
    },
  ]

  constructor() { }

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Comissão' }]
  };

  @ViewChild('form', { static: true }) form: FormControl;

  ngOnInit(): void {
  }

}
