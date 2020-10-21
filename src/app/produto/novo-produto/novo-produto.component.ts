import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoPageAction, PoRadioGroupOption, PoTableColumn } from '@po-ui/ng-components';
import { FormControl } from '@angular/forms';

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


  @ViewChild('form', { static: true }) form: FormControl;

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', url: '' },
    { label: 'Salvar e novo' },
    { label: 'Cancelar', url: '/produto' }
  ];

  colServicos: PoTableColumn[] = [
    {
      label: 'Nome',
      property: 'nome',
      width: '500px'
    },
    {
      label: 'Valor Unitário',
      property: 'valorUnitario',
      type: 'currency',
      format: 'BRL',
      width: '150px'
    },
    {
      label: 'Unidade',
      property: 'unidade',
      width: '150px'
    },
    {
      property: 'columnIcon', label: ' ', type: 'icon', width: '100px', action: console.log, icons: [
        { value: 'delete', icon: 'po-icon-plus', color: 'color-06', action: console.log, tooltip: 'Adiciona um novo item' },
        { value: 'edit', icon: 'po-icon-edit', action: console.log },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-12', action: console.log }
      ]
    },
  ]

  itemsServicos = [
    { nome: 'Servico 1', unidade: 'cm²', valorUnitario: 232.32, columnIcon: ['po-icon-edit', 'po-icon-delete'] },
    { nome: 'Servico 1', unidade: 'M²', valorUnitario: 34.38, columnIcon: ['po-icon-edit', 'po-icon-delete'] }
  ]

  
  readonly unidadeOptions: Array<PoRadioGroupOption> = [
    { label: 'Metros', value: 'm' },
    { label: 'Metros²', value: 'm2' },
    { label: 'Centimetros²', value: 'c2' },
    { label: 'Quilos', value: 'kg' }
  ];
}
