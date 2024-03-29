import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoModalComponent,
  PoBreadcrumb, PoDialogService, PoNotificationService, PoPageAction, PoSelectOption, PoTableColumn, PoDynamicViewField, PoModalAction, PoRadioGroupOption, PoInputComponent
} from '@po-ui/ng-components';
import {
  PoPageDynamicSearchFilters,
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableCustomTableAction,
} from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';
import { ContratoService } from '../contrato.service';
import { PoDynamicModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-listar-contrato',
  templateUrl: './listar-contrato.component.html',
  styleUrls: ['./listar-contrato.component.css'],
})
export class ListarContratoComponent implements OnInit {
  @ViewChild('userDetailModal') userDetailModal: PoModalComponent;

  @ViewChild('modalLancarParcela') modalLancarParcela: PoModalComponent;

  DataParcela: string;

  ValorParcela: number;

  openModal() {
    this.userDetailModal.open();
  }
  closeModal() {
    this.userDetailModal.close();
  }

  readonly serviceApi = `${environment.apiURL}/contrato`;
  detailedContrato;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: '/contrato/novo',
    edit: '/contrato/editar/:id',
    remove: true,
  };

  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'hireStatus', label: 'Hire Status', gridColumns: 6 },
    { property: 'name', gridColumns: 6 },
    { property: 'city', gridColumns: 6 },
    { property: 'job', label: 'Job Description', gridColumns: 6 }
  ];

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Contratos' }]
  };

  readonly SituacaoOptions: Array<object> = [
    { value: '1', label: 'Ativo' },
    { value: '0', label: 'Inativo' },
  ];

  readonly fields: Array<PoDynamicModule> = [
    { property: 'id', type: "number", key: true, visible: true, filter: false },
    { property: 'nomeCliente', label: 'Cliente', filter: false, gridColumns: 6 },
    {
      property: 'ativo', label: 'Situação', type: 'label',
      labels: [
        { value: true, color: 'color-11', label: 'Ativo', tooltip: 'Situação do contrato' },
        { value: false, color: 'color-07', label: 'Cancelado', tooltip: 'Situação do contrato' }
      ]
    },
    { property: 'dataInicio', label: 'Data inicio', type: 'date', filter: false, gridColumns: 3 },
    { property: 'dataTermino', label: 'Data Término', type: 'date', filter: false, gridColumns: 3 },
    { property: 'nomeVendedor', label: 'Vendedor', filter: false, gridColumns: 4 },
    { property: 'qntdExemplares', label: 'Quantidade de exemplares', type: 'number', filter: false, gridColumns: 4 },
    { property: 'numParcelas', label: 'Quantidade de parcelas', type: 'number', filter: false, gridColumns: 4 },
    { property: 'juros', label: 'Juros', type: 'currency', format: 'BRL', filter: false, gridColumns: 4 },
    { property: 'valorTotal', label: 'Valor Total', type: 'currency', format: 'BRL', filter: false, gridColumns: 4 },

  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'situacao', tag: true, gridLgColumns: 4, divider: 'Dados pessoais' },
    { property: 'nome', gridLgColumns: 4 },
    { property: 'username', label: 'Login', gridLgColumns: 4 }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [

  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    { label: 'Detalhes', action: this.onClickUserDetail.bind(this) }
  ];

  constructor(private contratoService: ContratoService) { }
  ngOnInit(): void {
  }

  printPage() {
    window.print();
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

  readonly parcelaOptions: Array<PoRadioGroupOption> = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '3' }
  ];

  private onClickUserDetail(contrato) {
    this.detailedContrato = contrato;

    this.userDetailModal.open();
  }
}