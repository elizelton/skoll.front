import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent, PoBreadcrumb, PoDynamicViewField } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent {

  @ViewChild('clienteDetailModal') clienteDetailModal: PoModalComponent;

  readonly serviceApi = 'http://localhost:3000/usuarios';
  detailedCliente;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: '/cliente/novo',
    remove: true,
    removeAll: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Clientes' }]
  };

  readonly SituacaoOptions: Array<object> = [
    { value: '1', label: 'Ativo' },
    { value: '0', label: 'Inativo' },
  ];

  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'hireStatus', label: 'Hire Status', gridColumns: 6 },
    { property: 'name', gridColumns: 6 },
    { property: 'city', gridColumns: 6 },
    { property: 'job', label: 'Job Description', gridColumns: 6 }
  ];

  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: false, filter: true },
    { property: 'nome', label: 'Nome', filter: true, gridColumns: 6 },
    { property: 'username', label: 'Login', filter: true, gridColumns: 4 },
    { property: 'situacao', tag: true, label: 'Situação', type: 'boolean', booleanTrue: 'Ativo', booleanFalse: 'Inativo', filter: true, gridColumns: 2 }
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'situacao', tag: true,  gridLgColumns: 4, divider: 'Dados pessoais' },
    { property: 'nome', gridLgColumns: 4 },
    { property: 'username', label: 'Login', gridLgColumns: 4 }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Imprimir', action: this.printPage.bind(this) },
    { label: 'Download .csv', action: this.clienteService.downloadCsv.bind(this.clienteService, this.serviceApi) }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    { label: 'Detalhes', action: this.onClickUserDetail.bind(this) }
  ];

  constructor(private clienteService: ClienteService) {}
  ngOnInit(): void {
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(cliente) {
    this.detailedCliente = cliente;

    this.clienteDetailModal.open();
  }

}
