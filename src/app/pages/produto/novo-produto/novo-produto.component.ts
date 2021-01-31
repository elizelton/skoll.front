import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoNotificationService, PoPageAction, PoRadioGroupOption, PoTableColumn } from '@po-ui/ng-components';
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

  produto: Produto
  servicoPrestado: ServicoPrestado
  itemsServicos: any
  tituloPagina: string = "Novo Produto"
  private sub: Subscription;
  private subService: Subscription;
  loading: boolean = false
  constructor(
    private produtoService: ProdutoService,
    private servicoPrestadoService: ServicoPrestadoService,
    public poNotification: PoNotificationService,
    private route: ActivatedRoute) {
    this.produto = new Produto()
    this.produto.ativo = true
    this.produto.nome = ""

    this.servicoPrestado = new ServicoPrestado();
    this.servicoPrestado.ativo = true;
    this.servicoPrestado.nome = ""
    this.servicoPrestado.produto = this.produto
    this.servicoPrestado.valorUnitario = 0

    if (this.produto.id) {
      this.servicoPrestado.produto = this.produto
    }
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.produto.id = +params['id'];

      if (this.produto.id) {
        this.loading = true
        this.subService = this.produtoService.get(this.produto.id).subscribe({
          next: (res: Produto) => {
            this.produto = res;
            this.tituloPagina = `Editar Produto #${res.id}`
            this.loading = false;
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

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Produtos', link: '/produto' }, { label: '' }]
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
    {
      property: 'columnIcon', label: ' ', type: 'icon', width: '100px', action: console.log, icons: [
        { value: 'delete', icon: 'po-icon-plus', color: 'color-06', action: () => {alert('ok') }, tooltip: 'Adiciona um novo item' },
        { value: 'edit', icon: 'po-icon-edit', action: console.log },
        { value: 'delete', icon: 'po-icon-delete', color: 'color-12', action: console.log }
      ]
    },
  ]



  salvarProduto() {
    if (this.produto.id) {
      this.subService = this.produtoService.update(this.produto.id, this.produto).subscribe({
        next: () => {
          this.poNotification.success('Produto editado com sucesso!');
        }
      })
    }
    else {
      this.produto.id = this.produto.id || 0
      this.subService = this.produtoService.insert(this.produto).subscribe({
        next: (res: Produto) => {
          this.produto.id = res.id;
          this.tituloPagina = `Editar Produto #${res.id}`
          this.poNotification.success('Produto criado com sucesso!');
        }
      })
    }
  }

  salvarServico() {
    this.servicoPrestadoService.insert(this.servicoPrestado)
      .subscribe(
        {
          next: (res: any) => {
            this.poNotification.success('Serviço criado com sucesso!');
            this.carregarServicos()
          }
        }
      )
  }

  carregarServicos(){
    if(this.produto.id){
      this.servicoPrestadoService.getByProduto(this.produto.id)
      .subscribe({
        next: (res: any) => {
          this.servicoPrestado.id = 0
          this.servicoPrestado.ativo = true
          this.servicoPrestado.nome = ""
          this.servicoPrestado.valorUnitario = 0
          this.itemsServicos = res.map(function (item) {
            return { columnIcon: ['po-icon-edit', 'po-icon-delete'], ...item }
          })
        }
      })
    }
  }
}
