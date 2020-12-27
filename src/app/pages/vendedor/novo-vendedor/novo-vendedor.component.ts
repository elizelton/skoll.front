import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PoDynamicFormComponent, PoBreadcrumb, PoSwitchLabelPosition, PoRadioGroupOption, PoPageAction, PoDynamicFormFieldValidation, PoTableColumn, PoModalComponent, PoModalAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-novo-vendedor',
  templateUrl: './novo-vendedor.component.html',
  styleUrls: ['./novo-vendedor.component.css']
})
export class NovoVendedorComponent implements OnInit {

  @ViewChild('dynamicForm', { static: true }) dynamicForm: PoDynamicFormComponent;
  public readonly serviceApi = 'http://localhost:3000/usuarios';

  reactiveForm: FormGroup;

  showEnderTel = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.reactiveForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
    })
  }

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Vendedores', link: '../../vendedor' },
      { label: 'Novo' },
    ],
  };

  labelPosition: PoSwitchLabelPosition = PoSwitchLabelPosition.Left;


  readonly stateOptions: Array<PoRadioGroupOption> = [
    { label: 'Paraná', value: 'PR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Rio Grande do Sul', value: 'RS' }
  ];

  readonly telefoneOptions: Array<PoRadioGroupOption> = [
    { label: 'Residencial', value: 1 },
    { label: 'Comercial', value: 2 }
  ];

  isFormValid(): boolean {
    return this.reactiveForm ? this.reactiveForm.invalid : false;
  }

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', url: '', disabled: !this.isFormValid() },
    { label: 'Salvar e novo' },
    { label: 'Cancelar', url: '/cliente' }
  ];

  cpfCnpfMask(changeValue): PoDynamicFormFieldValidation {
    debugger
    if (String(changeValue.value).length <= 11) {
      return {
        field: { mask: '###.###.###', property: 'cpfCnpj' },
      };
    } else {
      return {
        field: { mask: '##.###.###/####-##', property: 'cpfCnpj' },
      };
    }
  }

  colTel: PoTableColumn[] = [
    {
      label: 'Número',
      property: 'numero'
    },
    {
      label: 'Preferencial?',
      property: 'preferencial',
      type: 'boolean',
      boolean: {
        trueLabel: 'Sim', falseLabel: 'Não'
      }
    },
    {
      label: 'WhatsApp?',
      property: 'whatsapp',
      type: 'boolean', boolean: {
        trueLabel: 'Sim', falseLabel: 'Não'
      }
    },
    {
      label: 'Tipo',
      property: 'tipo',
      type: 'label',
      labels: [
        { value: 1, label: 'Residencial' },
        { value: 2, label: 'Comercial' },
      ]
    },
    {
      property: 'columnIcon', label: ' ', type: 'icon', action: console.log, icons: [
        { value: 'delete', icon: 'po-icon-plus', color: 'color-06', action: console.log, tooltip: 'Adiciona um novo item' },
        { value: 'edit', icon: 'po-icon-edit', action: console.log },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-12', action: console.log }
      ]
    },
  ]

  itemsTel = [{ numero: '(42) 3213-3212', preferencial: true, whatsapp: false, tipo: 2, columnIcon: ['po-icon-edit', 'po-icon-delete'] },
  { numero: '(42) 93230-2321', preferencial: false, whatsapp: true, tipo: 1, columnIcon: ['po-icon-edit', 'po-icon-delete'] },
  { numero: '(41) 4324-4234', preferencial: false, whatsapp: false, tipo: 2, columnIcon: ['po-icon-edit', 'po-icon-delete'] },]

  colEndereco: PoTableColumn[] = [
    {
      label: 'Logradouro',
      property: 'logradouro',
    },
    {
      label: 'Número',
      property: 'numero',
    }, {
      label: 'CEP',
      property: 'cep',

    },
    {
      label: 'Bairro',
      property: 'bairro',
    }, {
      label: 'Cidade',
      property: 'cidade',
    },
    {
      label: 'Estado',
      property: 'estado',
    },
  ]

  itemsEndereco = [{ logradouro: 'Av. dos Pioneiros', numero: '123', cep: '84145000', bairro: 'Colonia', cidade: 'Carambeó', estado: 'PR' }]


  @ViewChild('modal', { static: true }) poModal: PoModalComponent;


  closeModal() {
    this.poModal.close();
  }


  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      { }
    },
    label: 'Salvar'
  };

}
