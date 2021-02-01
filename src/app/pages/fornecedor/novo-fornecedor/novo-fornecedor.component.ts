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
import { Fornecedor } from 'src/app/model/Fornecedor.model';
import { Telefone } from 'src/app/model/Telefone.model';
import { CidadesService } from 'src/app/services/cidades.service';
import { TelefoneService } from 'src/app/services/telefone.service';
import { environment } from 'src/environments/environment';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-novo-fornecedor',
  templateUrl: './novo-fornecedor.component.html',
  styleUrls: ['./novo-fornecedor.component.css'],
})
export class NovoFornecedorComponent implements OnInit, OnDestroy {


  @ViewChild('dynamicForm', { static: true }) dynamicForm: PoDynamicFormComponent;
  public readonly serviceApi = environment.apiURL

  reactiveForm: FormGroup;

  showEnderTel = false;

  fornecedor: Fornecedor
  nome: string
  estado: string
  cidadeTemp: number
  cidadesOptions: PoComboOption
  telefone: Telefone = new Telefone();
  loading = false
  tituloPagina: string
  itemsTel = []
  private sub: Subscription;
  private subService: Subscription;
  constructor(
    private fb: FormBuilder,
    private cidadesService: CidadesService,
    private fornecedorService: FornecedorService,
    private telefoneService: TelefoneService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute
  ) {

    this.fornecedor = new Fornecedor();
    this.fornecedor.ativo = true;
    this.fornecedor.bairro = ""
    this.fornecedor.cep = ""
    this.fornecedor.complemento = ""
    this.fornecedor.cpfCnpj = ""
    this.fornecedor.email = ""
    this.fornecedor.logradouro = ""
    this.fornecedor.cidade = new Cidade()
    this.fornecedor.nome = ""
    this.fornecedor.numero = ""
    this.fornecedor.tipoFornecedor = 1
    this.fornecedor.telefones = []
  }

  ngOnInit() {

    this.estado = ''
    this.sub = this.route.params.subscribe(params => {
      this.fornecedor.idFornecedor = +params['id'];
      if (this.fornecedor.idFornecedor) {
        this.loading = true
        this.subService = this.fornecedorService.get(this.fornecedor.idFornecedor).subscribe({
          next: (res: Fornecedor) => {
            this.fornecedor = res;
            this.tituloPagina = `Editar Fornecedor #${res.idFornecedor}`
            this.estado = res.cidade.estado
            this.loadCidades()
            this.cidadeTemp = this.fornecedor.cidade.id
            this.getTelefones()
          }
        })
      }
      else{
        this.tituloPagina = "Novo Fornecedor"
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
      { label: 'Fornecedores', link: '/fornecedor' },
      { label: '' },
    ],
  };

  labelPosition: PoSwitchLabelPosition = PoSwitchLabelPosition.Left;


  readonly stateOptions: Array<PoRadioGroupOption> = this.cidadesService.getEstados()

  loadCidades() {
    this.fornecedor.cidade.id = this.fornecedor.cidade.id || 0
    this.cidadesService.getCidades(this.estado).subscribe(
      (res: any) => {
        this.cidadesOptions = res.map(function (item) {
          return { label: item.cidade, value: item.id }
        })
        this.fornecedor.cidade.id = this.fornecedor.cidade.id || this.cidadeTemp
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
    { label: 'Salvar', action: this.salvarFornecedor.bind(this) },
    { label: 'Cancelar', url: '/fornecedor' }
  ];

  salvarFornecedor() {
    this.fornecedorService.insert(this.fornecedor).subscribe()
    if (this.fornecedor.idFornecedor) {
      this.subService = this.fornecedorService.update(this.fornecedor.idFornecedor, this.fornecedor).subscribe({
        next: (res: Fornecedor) => {
          this.poNotification.success('Fornecedor editado com sucesso!');
        }
      })
    }
    else {
      this.fornecedor.id = this.fornecedor.id || 0
      this.fornecedor.idFornecedor = this.fornecedor.idFornecedor || 0
      this.subService = this.fornecedorService.insert(this.fornecedor).subscribe({
        next: (res: Fornecedor) => {
          this.fornecedor.id = res.id;
          this.fornecedor.idFornecedor = res.idFornecedor;
          this.tituloPagina = `Editar Fornecedor #${res.idFornecedor}`
          this.poNotification.success('Fornecedor criado com sucesso!');
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
    this.telefone.idPessoa = this.fornecedor.id;
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
    this.telefoneService.getTelefonesByPessoa(this.fornecedor.id)
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
