import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField } from '@po-ui/ng-components';
import { PoPageDynamicEditActions } from '@po-ui/ng-templates';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent {

  public readonly serviceApi = 'http://localhost:3000/usuarios';

  public readonly actions: PoPageDynamicEditActions = {
    save: '/documentation/po-page-dynamic-detail',
    saveNew: '/documentation/po-page-dynamic-edit'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Usuários', link: '../../usuario' },
      { label: 'Novo' }
    ]
  };

  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'nome', required: true, gridColumns: 4, errorMessage:'Nome é obrigatório' },
    { property: 'situacao',  type: 'boolean', booleanTrue: 'Ativo', booleanFalse: 'Inativo', gridColumns: 2 },
    { property: 'login', required: true, gridColumns: 3, divider: 'Dados de acesso' },
    {property: 'senha', required: true, secret: true, gridColumns: 3}
  ];

}
