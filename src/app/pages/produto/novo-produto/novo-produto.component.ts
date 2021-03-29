import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDialogService, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { FormControl } from '@angular/forms';
import { Produto } from 'src/app/model/Produto.model';
import { ProdutoService } from '../produto.service';
import { ServicoPrestado } from 'src/app/model/ServicoPrestado.model';
import { ServicoPrestadoService } from '../servico-prestado.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit, OnDestroy {

  produto: Produto;
  servicoPrestado: ServicoPrestado;
  itemsServicos: any;
  tituloPagina: string = "Novo Produto";
  private sub: Subscription;
  private subService: Subscription;
  loading: boolean = false;
  btnAddEditLabel = "Adicionar";
  constructor(
    private produtoService: ProdutoService,
    private servicoPrestadoService: ServicoPrestadoService,
    public poNotification: PoNotificationService,
    public poDialog: PoDialogService,
    private route: ActivatedRoute) {
    this.produto = new Produto();
    this.produto.ativo = true;
    this.produto.nome = "";

    this.servicoPrestado = new ServicoPrestado();
    this.servicoPrestado.ativo = true;
    this.servicoPrestado.nome = "";
    this.servicoPrestado.produto = this.produto;
    this.servicoPrestado.valorUnitario = 0;

    if (this.produto.id) {
      this.servicoPrestado.produto = this.produto;
    }
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.produto.id = +params['id'];

      if (this.produto.id) {
        this.loading = true;
        this.subService = this.produtoService.get(this.produto.id).subscribe({
          next: (res: Produto) => {
            this.produto = res;
            this.tituloPagina = `Editar Produto #${res.id}`;
            this.breadcrumb.items[2].label = "Editar";
            this.loading = false;
          }
        })
      }
    });
  }

  editarServico(servico) {
    this.servicoPrestado.valorUnitario = servico.valorUnitario;
    this.servicoPrestado.nome = servico.nome;
    this.servicoPrestado.id = servico.id;
    this.btnAddEditLabel = "Salvar";

  }

  excluirServico(servico) {

    this.poDialog.confirm({
      title: "Confirmar Exclusão",
      message: `Deseja remover o serviço prestado <strong>#${servico.nome}</strong>?`,
      confirm: () => {
        this.servicoPrestadoService.delete(this.servicoPrestado.id)
          .subscribe(
            {
              next: () => {
                this.poNotification.success({message: "Serviço prestado removido com sucesso.", duration: 6000 });
                this.carregarServicos()
              },
              error: () => {
                this.poNotification.error({message: "Falha ao remover Serviço Prestado.", duration: 6000 });
              }
            }
          )
      },
      cancel: () => { undefined }
    })
  }

  readonly actionsServicos: Array<PoTableAction> = [
    {
      action: this.editarServico.bind(this),
      icon: 'po-icon-edit',
      label: 'Editar'
    },
    {
      action: this.excluirServico.bind(this),
      icon: 'po-icon-delete',
      label: 'Excluir'
    }
  ];

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.subService) {
      this.subService.unsubscribe();
    }
  }

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Produtos', link: '/produto' }, { label: 'Novo' }]
  };


  @ViewChild('form', { static: true }) form: FormControl;

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvarProduto.bind(this) },
    { label: 'Cancelar', url: '/produto' }
  ];

  colServicos: PoTableColumn[] = [
    {
      label: 'Nome',
      property: 'nome',
      width: '50%'
    },
    {
      label: 'Valor Unitário',
      property: 'valorUnitario',
      type: 'currency',
      format: 'BRL',
    },
  ]



  salvarProduto() {
    if (this.produto.id) {
      this.subService = this.produtoService.update(this.produto.id, this.produto).subscribe({
        next: () => {
          this.poNotification.success({message: 'Produto editado com sucesso!', duration: 6000 });
        }
      })
    }
    else {
      this.produto.id = this.produto.id || 0;
      this.subService = this.produtoService.insert(this.produto).subscribe({
        next: (res: Produto) => {
          this.produto.id = res.id;
          this.tituloPagina = `Editar Produto #${res.id}`
          this.poNotification.success({message: 'Produto criado com sucesso!', duration: 6000 });
        }
      })
    }
  }

  salvarServico() {
    this.servicoPrestado.id = this.servicoPrestado.id || 0;
    if (!this.servicoPrestado.id) {
      this.servicoPrestadoService.insert(this.servicoPrestado)
        .subscribe(
          {
            next: (res: any) => {
              this.poNotification.success({message: 'Serviço criado com sucesso!', duration: 6000 });
              this.carregarServicos();
            }
          }
        )
    }
    else {
      let sub = this.servicoPrestadoService.update(this.servicoPrestado.id, this.servicoPrestado).subscribe({
        next: () => {
          this.poNotification.success({message: 'Serviço editado com sucesso!', duration: 6000 });
          sub.unsubscribe();
        }
      })
    }
  }

  carregarServicos() {
    if (this.produto.id) {
      this.servicoPrestadoService.getByProduto(this.produto.id)
        .subscribe({
          next: (res: any) => {
            this.servicoPrestado.id = 0;
            this.servicoPrestado.ativo = true;
            this.servicoPrestado.nome = "";
            this.servicoPrestado.valorUnitario = 0;
            this.itemsServicos = res.map(function (item) {
              return { columnIcon: ['po-icon-edit', 'po-icon-delete'], ...item }
            })
          }
        })
    }
  }
}
