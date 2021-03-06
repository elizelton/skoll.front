import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent, PoBreadcrumb, PoDynamicViewField } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-listar-fornecedor',
  templateUrl: './listar-fornecedor.component.html',
  styleUrls: ['./listar-fornecedor.component.css']
})
export class ListarFornecedorComponent {

  @ViewChild('fornecedorDetailModal') fornecedorDetailModal: PoModalComponent;

  readonly serviceApi = `${environment.apiURL}/fornecedor`
  detailedFornecedor;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: '/fornecedor/novo',
    edit: '/fornecedor/editar/:id',
    remove: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Fornecedores' }]
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
    { property: 'idFornecedor', key: true, visible: false, filter: false },
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
    { property: 'situacao', tag: true, gridLgColumns: 4, divider: 'Dados pessoais' },
    { property: 'nome', gridLgColumns: 4 },
    { property: 'email', label: 'Email', gridLgColumns: 4 }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Imprimir', action: this.printPage.bind(this) },
    { label: 'Download .csv', action: this.fornecedorService.downloadCsv.bind(this.fornecedorService, this.serviceApi) }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    { label: 'Detalhes', action: this.onClickUserDetail.bind(this) }
  ];

  constructor(private fornecedorService: FornecedorService) { }
  ngOnInit(): void {
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(fornecedor) {
    this.detailedFornecedor = fornecedor;

    this.fornecedorDetailModal.open();
  }

}
