import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicViewField, PoModalComponent } from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  @ViewChild('userDetailModal') userDetailModal: PoModalComponent;

  readonly serviceApi = `${environment.apiURL}/usuario`;
  detailedUser;
  quickSearchWidth: number = 3;

  readonly actions: PoPageDynamicTableActions = {
    new: '/usuario/novo',
    edit: 'usuario/editar/:id'
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
    { value: true, label: 'Ativo' },
    { value: false, label: 'Inativo' },
  ];

  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: true, filter: false },
    { property: 'nome', label: 'Nome', filter: false, gridColumns: 6 },
    { property: 'userName', label: 'Login', filter: false, gridColumns: 4 },
    { property: 'email', label: 'E-mail', filter: false, gridColumns: 4 },
    {
      property: 'ativo', label: 'Situação', type: 'label', 
      labels: [
        { value: true, color: 'color-11', label: 'Ativo', tooltip: 'Situação do usuário' },
        { value: false, color: 'color-07', label: 'Inativo', tooltip: 'Situação do usuário' }
       ]
    }
  ];


  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    { label: 'Detalhes', action: this.onClickUserDetail.bind(this) }
  ];

  constructor(private usuarioService: UsuarioService) { }
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
