import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField } from '@po-ui/ng-components';
import { PoPageDynamicEditActions } from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent {

  readonly serviceApi = `${environment.apiURL}/usuario`;

  public readonly actions: PoPageDynamicEditActions = {
    save: '/documentation/po-page-dynamic-detail'
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Usuários', link: '../../usuario' },
      { label: 'Novo' }
    ]
  };

  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'nome', icon:'people',required: true, gridColumns: 4, errorMessage:'Nome é obrigatório' },
    { property: 'situacao',  type: 'boolean',fieldValue: 'true', booleanTrue: 'Ativo', booleanFalse: 'Inativo',  gridColumns: 2 },
    { property: 'username', label:'Nome do usuário',required: true, gridColumns: 3, divider: 'Dados de acesso' },
    { property: 'email',type:'email', required: true, gridColumns: 3, errorMessage:'E-mail é obrigatório'},
    {property: 'senha', required: true, secret: true, gridColumns: 3}
  ];

}
