import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  @ViewChild('userDetailModal') userDetailModal: PoModalComponent;

  readonly serviceApi = 'http://localhost:3000/usuarios';
  detailedUser;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: '/usuario/novo',
    remove: true,
    removeAll: true
  };

  public readonly filters: Array<PoPageDynamicSearchFilters> = [
    { property: 'hireStatus', label: 'Hire Status', gridColumns: 6 },
    { property: 'name', gridColumns: 6 },
    { property: 'city', gridColumns: 6 },
    { property: 'job', label: 'Job Description', gridColumns: 6 }
  ];

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Usuários' }]
  };

  readonly SituacaoOptions: Array<object> = [
    { value: '1', label: 'Ativo' },
    { value: '0', label: 'Inativo' },
  ];

  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: true, filter: true },
    { property: 'nome', label: 'Nome', filter: true, gridColumns: 6 },
    { property: 'username', label: 'Login', filter: true, gridColumns: 4 },
    {
      property: 'situacao', label: 'Situação', type: 'label', 
      labels: [
        { value: 1, color: 'color-11', label: 'Ativo', tooltip: 'Situação do usuário' },
        { value: 0, color: 'color-07', label: 'Inativo', tooltip: 'Situação do usuário' }
       ]
    }
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'situacao', tag: true, gridLgColumns: 4, divider: 'Dados pessoais' },
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

  constructor(private usersService: UsuarioService) { }
  ngOnInit(): void {
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(usuario) {
    this.detailedUser = usuario;

    this.userDetailModal.open();
  }
}
