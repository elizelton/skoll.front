import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { FormaPagamento } from 'src/app/model/FormaPagamento.model';
import { environment } from 'src/environments/environment';
import { FormaPagamentoService } from '../forma-pagamento.service';

@Component({
  selector: 'app-listar-forma-pagamento',
  templateUrl: './listar-forma-pagamento.component.html',
  styleUrls: ['./listar-forma-pagamento.component.css']
})
export class ListarFormaPagamentoComponent implements OnInit {

  @ViewChild('userDetailModal') userDetailModal: PoModalComponent;

  readonly serviceApi = `${environment.apiURL}/formapagamento/`
  detailedFormaPagamento;
  quickSearchWidth: number = 3;
  detalhesFormaPagamento: string

  readonly actions: PoPageDynamicTableActions = {
    new: '/forma-pagamento/novo',
    edit: '/forma-pagamento/editar/:id',
    remove: true
  };

  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'hireStatus', label: 'Hire Status', gridColumns: 6 },
    { property: 'name', gridColumns: 6 },
    { property: 'city', gridColumns: 6 },
    { property: 'job', label: 'Job Description', gridColumns: 6 }
  ];

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Formas de Pagamento' }]
  };

  readonly SituacaoOptions: Array<object> = [
    { value: '1', label: 'Ativo' },
    { value: '0', label: 'Inativo' },
  ];

  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: true, filter: true },
    { property: 'nome', label: 'Nome', filter: true, gridColumns: 6 },
    { property: 'qtdParcela', type: 'number', format: '', label: 'Quantidade de parcelas', filter: true, gridColumns: 4 },
    {
      property: 'ativo', label: 'Situação', type: 'label', 
      labels: [
        { value: true, color: 'color-11', label: 'Ativo', tooltip: 'Situação do usuário' },
        { value: false, color: 'color-07', label: 'Inativo', tooltip: 'Situação do usuário' }
       ]
    }
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'nome', gridLgColumns: 4 },
    { property: 'qtdParcela', label: 'Quantidade de Parcelas', gridLgColumns: 4 },
    { property: 'ativoMascared', label: 'Situação', gridLgColumns: 4,  },
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    { label: 'Imprimir', action: this.printPage.bind(this) },
    { label: 'Download .csv', action: this.formaPagamentoService.downloadCsv.bind(this.formaPagamentoService, this.serviceApi) }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    { label: 'Detalhes', action: this.onClickUserDetail.bind(this) }
  ];

  constructor(private formaPagamentoService: FormaPagamentoService) { }
  ngOnInit(): void {
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(FormaPagamento) {
    this.detalhesFormaPagamento = `#${FormaPagamento.id} - Detalhes da Forma de pagamento`
    FormaPagamento.ativoMascared = FormaPagamento.ativo ? 'Ativo' : 'Inativo'
    this.detailedFormaPagamento = FormaPagamento;

    this.userDetailModal.open();
  }

}
