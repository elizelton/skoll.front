import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent, PoBreadcrumb, PoDynamicViewField } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicSearchFilters, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableFilters } from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';
import { VendedorService } from '../vendedor.service';
@Component({
  selector: 'app-listar-vendedor',
  templateUrl: './listar-vendedor.component.html',
  styleUrls: ['./listar-vendedor.component.css']
})
export class ListarVendedorComponent implements OnInit {
  @ViewChild('userDetailModal') userDetailModal: PoModalComponent;

  readonly serviceApi = `${environment.apiURL}/vendedor/`
  detailedUser;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: '/vendedor/novo',
    edit: '/vendedor/editar/:id',
    remove: true
  };

  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'hireStatus', label: 'Hire Status', gridColumns: 6 },
    { property: 'name', gridColumns: 6 },
    { property: 'city', gridColumns: 6 },
    { property: 'job', label: 'Job Description', gridColumns: 6 }
  ];

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Vendedores' }]
  };

  readonly SituacaoOptions: Array<object> = [
    { value: '1', label: 'Ativo' },
    { value: '0', label: 'Inativo' },
  ];

  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: true, filter: false },
    { property: 'nome', label: 'Nome', filter: false, gridColumns: 6 },
    { property: 'codigo', label: 'Código', filter: false, gridColumns: 4 },
    { property: 'percComis', type: 'number', format: '', label: 'Percentual de comissão', filter: false, gridColumns: 4 },
    {
      property: 'ativo', label: 'Situação', type: 'label', 
      labels: [
        { value: true, color: 'color-11', label: 'Ativo', tooltip: 'Situação do usuário' },
        { value: false, color: 'color-07', label: 'Inativo', tooltip: 'Situação do usuário' }
       ]
    }
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'ativo', tag: true, gridLgColumns: 4, divider: 'Dados pessoais' },
    { property: 'nome', gridLgColumns: 4 },
    { property: 'username', label: 'Login', gridLgColumns: 4 }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Imprimir', action: this.printPage.bind(this) },
    { label: 'Download .csv', action: this.usersService.downloadCsv.bind(this.usersService, this.serviceApi) }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    { label: 'Detalhes', action: this.onClickUserDetail.bind(this) }
  ];

  constructor(private usersService: VendedorService) { }
  ngOnInit(): void {
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(Vendedor) {
    this.detailedUser = Vendedor;

    this.userDetailModal.open();
  }
}
