import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent, PoBreadcrumb, PoDynamicViewField } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent {

  @ViewChild('clienteDetailModal') clienteDetailModal: PoModalComponent;

  readonly serviceApi = `${environment.apiURL}/cliente`
  detailedCliente;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: '/cliente/novo',
    edit: '/cliente/editar/:id',
    remove: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Clientes' }]
  };

  readonly SituacaoOptions: Array<object> = [
    { value: '1', label: 'Ativo' },
    { value: '0', label: 'Inativo' },
  ];

  readonly fields: Array<any> = [
    { property: 'idCliente', key: true, visible: false, filter: false },
    { property: 'nome', label: 'Nome', filter: false, gridColumns: 6 },
    { property: 'cpfCnpj', label: 'CPF/CNPJ', filter: false, gridColumns: 6 },
    { property: 'email', label: 'E-mail', filter: false, gridColumns: 4 },
    {
      property: 'ativo', label: 'Situação', type: 'label',
      labels: [
        { value: true, color: 'color-11', label: 'Ativo', tooltip: 'Situação do fornecedor' },
        { value: false, color: 'color-07', label: 'Cancelado', tooltip: 'Situação do fornecedor' }
      ]
    },
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'idCliente', key: true, visible: false },
    { property: 'nome', label: 'Nome', gridColumns: 6 },
    { property: 'cpfCnpj', label: 'CPF/CNPJ', gridColumns: 6 },
    { property: 'email', label: 'E-mail', gridColumns: 4 },
    { property: 'ativoMascared', label: 'Situação', gridLgColumns: 4,  }
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

  tituloDetalhesCliente
  
  private onClickUserDetail(cliente) {
    this.detailedCliente = cliente;
    this.tituloDetalhesCliente = `#${cliente.id} - Detalhes do Cliente`
    cliente.ativoMascared = cliente.ativo ? 'Ativo' : 'Inativo'
    this.clienteDetailModal.open();
  }

}
