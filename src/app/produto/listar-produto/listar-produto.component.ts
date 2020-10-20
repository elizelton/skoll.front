import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.css']
})
export class ListarProdutoComponent implements OnInit {

  @ViewChild('produtoDetailModal') produtoDetailModal: PoModalComponent;

  readonly serviceApi = 'http://localhost:3000/produto';
  detailedProduto;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: '/produto/novo',
    remove: true,
    removeAll: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Produtos' }]
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
    { property: 'produto', label: 'Produto', filter: true, gridColumns: 6 },
    { property: 'situacao', tag: true, label: 'Situação', type: 'boolean', booleanTrue: 'Ativo', booleanFalse: 'Inativo', filter: true, gridColumns: 2 }
  ];


  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Imprimir', action: this.printPage.bind(this) },
    { label: 'Download .csv', action: this.produtoService.downloadCsv.bind(this.produtoService, this.serviceApi) }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    { label: 'Editar', action:  console.log }
  ];

  constructor(private produtoService: ProdutoService) {}
  ngOnInit(): void {
  }

  printPage() {
    window.print();
  }


}
