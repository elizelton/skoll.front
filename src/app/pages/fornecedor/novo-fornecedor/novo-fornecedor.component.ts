import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PoBreadcrumb,
  PoComboOption,
  PoDynamicFormFieldValidation,
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

  public readonly serviceApi = environment.apiURL


  showEnderTel = false;

  fornecedor: Fornecedor
  nome: string
  estado: string
  cidadesOptions: PoComboOption
  telefone: Telefone = new Telefone();
  loading = false
  tituloPagina: string = "Nova Forma de Pagamento"
  private sub: Subscription;
  private subService: Subscription;
  constructor(
    private cidadesService: CidadesService,
    private fornecedorService: FornecedorService,
    private telefoneService: TelefoneService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute
  ) {

    this.fornecedor = new Fornecedor();
    this.fornecedor.ativo = true;
    this.fornecedor.cidade = new Cidade()

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.fornecedor.id = +params['id'];

      if (this.fornecedor.id) {
        this.loading = true
        this.subService = this.fornecedorService.get(this.fornecedor.id).subscribe({
          next: (res: Fornecedor) => {
            this.fornecedor = res;
            this.tituloPagina = `Editar Fornecedor #${res.id}`
            this.loading = false;
          }
        })
      }
      this.estado = ''
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
      { label: 'Fornecedores', link: '../../fornecedor' },
      { label: 'Novo' },
    ],
  };

  labelPosition: PoSwitchLabelPosition = PoSwitchLabelPosition.Left;


  readonly stateOptions: Array<PoRadioGroupOption> = this.cidadesService.getEstados()

  loadCidades() {
    this.fornecedor.cidade.id = 0
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


  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvar.bind(this) },
    { label: 'Cancelar', url: '/fornecedor' }
  ];

  salvar() {
    if (this.fornecedor.id) {
      this.subService = this.fornecedorService.update(this.fornecedor.id, this.fornecedor).subscribe({
        next: () => {
          this.poNotification.success('Fornecedor editado com sucesso!');
        }
      })
    }
    else {
      this.subService = this.fornecedorService.insert(this.fornecedor).subscribe({
        next: (res: Fornecedor) => {
          this.fornecedor.id = res.id;
          this.poNotification.success('Fornecedor criado com sucesso!');
        }
      })
    }
    this.fornecedorService.insert(this.fornecedor).subscribe()

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
