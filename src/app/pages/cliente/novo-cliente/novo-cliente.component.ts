import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PoBreadcrumb,
  PoComboOption,
  PoDynamicFormComponent,
  PoDynamicFormFieldValidation,
  PoLookupLiterals,
  PoModalAction,
  PoModalComponent,
  PoPageAction,
  PoRadioGroupOption,
  PoSwitchLabelPosition,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Cidade } from 'src/app/model/Cidade.model';
import { Cliente } from 'src/app/model/Cliente.model';
import { Telefone } from 'src/app/model/Telefone.model';
import { CidadesService } from 'src/app/services/cidades.service';
import { TelefoneService } from 'src/app/services/telefone.service';
import { environment } from 'src/environments/environment';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css'],
})
export class NovoClienteComponent implements OnInit {


  @ViewChild('dynamicForm', { static: true }) dynamicForm: PoDynamicFormComponent;
  public readonly serviceApi = environment.apiURL

  reactiveForm: FormGroup;

  showEnderTel = false;

  cliente: Cliente
  nome: string
  estado: string
  cidadesOptions: PoComboOption
  telefone: Telefone = new Telefone();
  loading = false
  constructor(
    private fb: FormBuilder,
    private cidadesService: CidadesService,
    private clienteService: ClienteService,
    private telefoneService: TelefoneService
  ) {

    this.cliente = new Cliente();
    this.cliente.ativo = true;
    this.cliente.bairro=""
    this.cliente.cep=""
    this.cliente.complemento=""
    this.cliente.cpfCnpj=""
    this.cliente.email=""
    this.cliente.logradouro=""
    this.cliente.nascimento = new Date("1990-01-01T00:24:00");
    this.cliente.cidade = new Cidade()
    this.cliente.nome=""
    this.cliente.numero=""
    this.cliente.tipoCliente=0
    this.cliente.telefones= []
  }

  ngOnInit() {

    this.estado = ''
  }

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Clientes', link: '../../cliente' },
      { label: 'Novo' },
    ],
  };

  labelPosition: PoSwitchLabelPosition = PoSwitchLabelPosition.Left;


  readonly stateOptions: Array<PoRadioGroupOption> = this.cidadesService.getEstados()

  loadCidades() {
    this.cliente.cidade.id = 0
    this.cidadesService.getCidades(this.estado).subscribe(
      (res: any) => {
        this.cidadesOptions = res.map(function (item) {
          return { label: item.cidade, value: item.id }
        })
      }
    )
  }

  readonly telefoneOptions: Array<PoRadioGroupOption> = [
    { label: 'Residencial', value: 1 },
    { label: 'Comercial', value: 2 }
  ];

  isFormValid(): boolean {
    return this.reactiveForm ? this.reactiveForm.invalid : false;
  }

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvar.bind(this) },
    { label: 'Cancelar', url: '/cliente' }
  ];

  salvar() {
    this.clienteService.insert(this.cliente).subscribe()

  }


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
      label: 'DDD',
      property: 'ddd'
    },
    {
      label: 'Número',
      property: 'numero'
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



  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;


  abrirModalTelefone() {
    this.telefone = new Telefone();
    this.telefone.idPessoa = this.cliente.id;
    this.poModal.open();
  }


  closeModal() {
    this.poModal.close();
  }

  salvarTelefone() {
    this.loading = true
    this.telefoneService.insert(this.telefone).subscribe(
      {
        next: () => {
          this.poModal.close();
          this.loading = false
        },
        error: () => {
          this.loading = false
        }
      }
    )
  }



  close: PoModalAction = {
    action: this.closeModal.bind(this),
    label: 'Cancelar',
    danger: true,
  };

  confirm: PoModalAction = {
    action: this.salvarTelefone.bind(this),
    label: 'Salvar',
    loading: this.loading
  };

}
