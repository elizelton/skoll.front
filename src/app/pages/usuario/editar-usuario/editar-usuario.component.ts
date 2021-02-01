import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField } from '@po-ui/ng-components';
import { PoPageDynamicEditActions } from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  readonly serviceApi = `${environment.apiURL}/usuario`;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Usuários', link: '../../usuario' },
      { label: 'Novo' }
    ]
  };

  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'nome', required: true, gridColumns: 4, errorMessage: 'Nome é obrigatório' },
    { property: 'ativo', type: 'boolean', fieldValue: 'true', booleanTrue: 'Ativo', booleanFalse: 'Inativo', gridColumns: 2 },
    { property: 'userName', required: true, gridColumns: 3, divider: 'Dados de acesso' },
    { property: 'E-mail', required: true, gridColumns: 3},
    { property: 'senha', required: true, secret: true, gridColumns: 3 }
  ];

  public readonly actions: PoPageDynamicEditActions = {
    save: '/documentation/po-page-dynamic-detail',
    
  };

  constructor() { }

  ngOnInit(): void {
  }

}
