import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent, PoBreadcrumb, PoDynamicViewField } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicSearchFilters, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { ContratoService } from 'src/app/pages/contrato/contrato.service';
import { environment } from 'src/environments/environment';
import { PoDynamicModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-listar-conta-pagar',
  templateUrl: './listar-conta-pagar.component.html',
  styleUrls: ['./listar-conta-pagar.component.css']
})
export class ListarContaPagarComponent implements OnInit {
  @ViewChild('userDetailModal') userDetailModal: PoModalComponent;

  readonly serviceApi = `${environment.apiURL}/contapagar`
  detailedUser;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: '/conta-pagar/novo',
    edit: '/conta-pagar/editar/:id',
    remove: true
  };

  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'hireStatus', label: 'Hire Status', gridColumns: 6 },
    { property: 'name', gridColumns: 6 },
    { property: 'city', gridColumns: 6 },
    { property: 'job', label: 'Job Description', gridColumns: 6 }
  ];

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Contas a Pagar' }]
  };

  readonly SituacaoOptions: Array<object> = [
    { value: '1', label: 'Ativo' },
    { value: '0', label: 'Inativo' },
  ];

  readonly fields: Array<PoDynamicModule> = [
    { property: 'id', key: true, visible: true, filter: false },
    { property: 'nomeFornecedor', label: 'Fornecedor', filter: false, gridColumns: 4 },
    { property: 'numParcelas', label: 'Quantidade de parcelas', type: 'number', filter: false, gridColumns: 4 },
    { property: 'valorMensal', label: 'Valor Mensal', type: 'currency', format: 'BRL', filter: false, gridColumns: 4 },
    { property: 'valorTotal', label: 'Valor Total', type: 'currency', format: 'BRL', filter: false, gridColumns: 4 },

  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'situacao', tag: true, gridLgColumns: 4, divider: 'Dados pessoais' },
    { property: 'nome', gridLgColumns: 4 },
    { property: 'username', label: 'Login', gridLgColumns: 4 }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Imprimir', action: this.printPage.bind(this) },
    { label: 'Download .csv', action: this.contratoService.downloadCsv.bind(this.contratoService, this.serviceApi) }
  ];


  constructor(private contratoService: ContratoService) { }
  ngOnInit(): void {
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(contrato) {
    this.detailedUser = contrato;

    this.userDetailModal.open();
  }
}