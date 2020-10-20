import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Produtos', link: '/produto' }, { label: 'Novo' }]
  };

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', url: '' },
    { label: 'Salvar e novo' },
    { label: 'Cancelar', url: '/produto' }
  ];
}
