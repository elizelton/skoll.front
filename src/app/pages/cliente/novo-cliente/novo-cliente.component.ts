import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  PoBreadcrumb,
  PoComboOption,
  PoDynamicFormComponent,
  PoDynamicFormFieldValidation,
  PoLookupLiterals,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoRadioGroupOption,
  PoSwitchLabelPosition,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
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
export class NovoClienteComponent implements OnInit, OnDestroy {


  @ViewChild('dynamicForm', { static: true }) dynamicForm: PoDynamicFormComponent;
  public readonly serviceApi = environment.apiURL

  reactiveForm: FormGroup;

  showEnderTel = false;

  cliente: Cliente
  nome: string
  estado: string
  cidadeTemp: number
  cidadesOptions: PoComboOption
  telefone: Telefone = new Telefone();
  loading = false
  tituloPagina: string = "Novo Cliente"
  itemsTel = []
  private sub: Subscription;
  private subService: Subscription;
  constructor(
    private fb: FormBuilder,
    private cidadesService: CidadesService,
    private clienteService: ClienteService,
    private telefoneService: TelefoneService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute
  ) {

    this.cliente = new Cliente();
    this.cliente.ativo = true;
    this.cliente.bairro = ""
    this.cliente.cep = ""
    this.cliente.complemento = ""
    this.cliente.cpfCnpj = ""
    this.cliente.email = ""
    this.cliente.logradouro = ""
    this.cliente.nascimento = new Date("1990-01-01T00:24:00");
    this.cliente.cidade = new Cidade()
    this.cliente.nome = ""
    this.cliente.numero = ""
    this.cliente.tipoCliente = 1
    this.cliente.telefones = []
  }

  ngOnInit() {

    this.estado = ''
    this.sub = this.route.params.subscribe(params => {
      this.cliente.idCliente = +params['id'];
      if (this.cliente.idCliente) {
        this.loading = true
        this.subService = this.clienteService.get(this.cliente.idCliente).subscribe({
          next: (res: Cliente) => {
            this.cliente = res;
            this.tituloPagina = `Editar Cliente #${res.idCliente}`
            this.cliente.nascimento = new Date(this.cliente.nascimento)
            this.estado = res.cidade.estado
            this.loadCidades()
            this.cidadeTemp = this.cliente.cidade.id
            this.getTelefones()
          }
        })
      }

    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.subService)
      this.subService.unsubscribe();
  }


  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Clientes', link: '/cliente' },
      { label: '' },
    ],
  };

  labelPosition: PoSwitchLabelPosition = PoSwitchLabelPosition.Left;


  readonly stateOptions: Array<PoRadioGroupOption> = this.cidadesService.getEstados()

  loadCidades() {
    this.cliente.cidade.id = this.cliente.cidade.id || 0
    this.cidadesService.getCidades(this.estado).subscribe(
      (res: any) => {
        this.cidadesOptions = res.map(function (item) {
          return { label: item.cidade, value: item.id }
        })
        this.cliente.cidade.id = this.cliente.cidade.id || this.cidadeTemp
      }
    )
  }

  readonly telefoneOptions: Array<PoRadioGroupOption> = [
    { label: 'Residencial', value: 1 },
    { label: 'Comercial', value: 2 },
    { label: 'Celular', value: 3 }
  ];

  readonly tipoPessoaOptions: Array<any> = [
    { label: 'Pessoa Fisica', value: 1 },
    { label: 'Pessoa Juridica', value: 2 }
  ]

  isFormValid(): boolean {
    return this.reactiveForm ? this.reactiveForm.invalid : false;
  }

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvarCliente.bind(this) },
    { label: 'Cancelar', url: '/cliente' }
  ];

  salvarCliente() {
    this.clienteService.insert(this.cliente).subscribe()
    if (this.cliente.idCliente) {
      this.subService = this.clienteService.update(this.cliente.idCliente, this.cliente).subscribe({
        next: (res: Cliente) => {
          this.poNotification.success('Cliente editado com sucesso!');
        }
      })
    }
    else {
      this.cliente.id = this.cliente.id || 0
      this.cliente.idCliente = this.cliente.idCliente || 0
      this.subService = this.clienteService.insert(this.cliente).subscribe({
        next: (res: Cliente) => {
          this.cliente.id = res.id;
          this.cliente.idCliente = res.idCliente;
          this.tituloPagina = `Editar Cliente #${res.idCliente}`
          this.poNotification.success('Cliente criado com sucesso!');
        }
      })
    }
  }


  colTel: PoTableColumn[] = [
    {
      label: 'DDD',
      property: 'ddd'
    },
    {
      label: 'Número',
      property: 'telefone'
    },
    {
      label: 'WhatsApp?',
      property: 'whatsApp',
      type: 'boolean',
      boolean: {
        trueLabel: 'Sim', falseLabel: 'Não'
      }
    },
    {
      label: 'Tipo',
      property: 'tipoTelefone',
      type: 'label',
      labels: [
        { value: 1, label: 'Residencial' },
        { value: 2, label: 'Comercial' },
        { value: 3, label: 'Celular' },
      ]
    },
    {
      property: 'columnIcon', label: ' ', type: 'icon', action: console.log, icons: [
        { value: 'edit', icon: 'po-icon-edit', action: console.log },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-12', action: console.log }
      ]
    },
  ]



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
          this.getTelefones()
          this.loading = false
        },
        error: () => {
          this.loading = false
        }
      }
    )
  }

  getTelefones() {
    this.telefoneService.getTelefonesByPessoa(this.cliente.id)
      .subscribe({
        next: (res: any) => {
          this.itemsTel = res.map(function (item) {
            return { columnIcon: ['po-icon-edit', 'po-icon-delete'], ...item }
          })
          this.loading = false;
        }
      })
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
