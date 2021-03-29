import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  PoBreadcrumb,
  PoComboOption,
  PoDialogService,
  PoDynamicFormComponent,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoRadioGroupOption,
  PoSwitchLabelPosition,
  PoTableAction,
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
  modalTelefoneTitulo = "Novo Telefone"
  showTelTable = true
  itemsTel = []
  private sub: Subscription;
  private subService: Subscription;
  constructor(
    private fb: FormBuilder,
    private cidadesService: CidadesService,
    private clienteService: ClienteService,
    private telefoneService: TelefoneService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute,
    public poDialog: PoDialogService
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
            this.breadcrumb.items[2].label = "Editar"
            this.cliente.nascimento = new Date(this.cliente.nascimento)
            this.estado = res.cidade.estado
            this.loadCidades()
            this.cidadeTemp = this.cliente.cidade.id
            this.cliente.cidade.id = null
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
      { label: 'Novo' },
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
        this.cliente.cidade.id = this.cidadeTemp
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
    if (this.cliente.idCliente) {
      this.subService = this.clienteService.update(this.cliente.idCliente, this.cliente).subscribe({
        next: (res: Cliente) => {
          this.poNotification.success({message: 'Cliente editado com sucesso!', duration: 6000 });
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
          this.poNotification.success({message: 'Cliente criado com sucesso!', duration: 6000 });
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
    }
  ]

  readonly actionsTel: Array<PoTableAction> = [
    {
      action: this.editarTelefone.bind(this),
      icon: 'po-icon-edit',
      label: 'Editar'
    },
    {
      action: this.excluirTelefone.bind(this),
      icon: 'po-icon-delete',
      label: 'Excluir'
    }
  ];

  excluirTelefone(telefone) {

    this.poDialog.confirm({
      title: "Confirmar Exclusão",
      message: `Deseja remover o telefone?`,
      confirm: () => {
        this.telefoneService.delete(telefone.id)
          .subscribe(
            {
              next: () => {
                this.poNotification.success({message: "Telefone removido com sucesso.", duration: 6000 });
                this.getTelefones()
              },
              error: () => {
                this.poNotification.error({message: "Falha ao remover telefone.", duration: 6000 });
              }
            }
          )
      },
      cancel: () => { undefined }
    })
  }

  editarTelefone(telefone) {
    this.modalTelefoneTitulo = "Editar Telefone"
    this.telefone = new Telefone();
    this.telefone = telefone;
    this.poModal.open();

  }

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
    if (this.telefone.id) {
      this.subService = this.telefoneService.update(this.telefone.id, this.telefone).subscribe({
        next: () => {
          this.poNotification.success({message: 'Telefone editado com sucesso!', duration: 6000 });
          this.poModal.close();
          this.getTelefones()
          this.loading = false
        },
        error: () => {
          this.loading = false
        }
      })
    }
    else {
      this.telefone.id = this.telefone.id || 0
      this.subService = this.telefoneService.insert(this.telefone).subscribe(
        {
          next: () => {
            this.poModal.close();
            this.getTelefones()
            this.loading = false
            this.poNotification.success({message: 'Telefone adicionado com sucesso!', duration: 6000 });
          },
          error: () => {
            this.loading = false
          }
        }
      )
    }
  }

  getTelefones() {
    this.telefoneService.getTelefonesByPessoa(this.cliente.id)
      .subscribe({
        next: (res: any[]) => {
          this.itemsTel = res
          if(res.length == 0)
            this.showTelTable = false
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
