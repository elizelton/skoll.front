import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { PoBreadcrumb, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { FormaPagamento } from 'src/app/model/FormaPagamento.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-novo-forma-pagamento',
  templateUrl: './novo-forma-pagamento.component.html',
  styleUrls: ['./novo-forma-pagamento.component.css']
})
export class NovoFormaPagamentoComponent implements OnInit, OnDestroy {

  private sub: any;
  private subService: Subscription;
  loading: boolean = false
  formaPagamento: FormaPagamento
  tituloPagina: string = "Nova Forma de Pagamento"
  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute) {
    this.formaPagamento = new FormaPagamento();
    this.formaPagamento.nome = "";
    this.formaPagamento.ativo = true;
    this.formaPagamento.qtdParcela = 0;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if(this.subService)
      this.subService.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.formaPagamento.id = +params['id'];

      if (this.formaPagamento.id) {
        this.loading = true
        this.subService = this.formaPagamentoService.get(this.formaPagamento.id).subscribe({
          next: (res: FormaPagamento) => {
            this.formaPagamento = res;
            this.tituloPagina = `Editar Forma de Pagamento #${res.id}`
            this.breadcrumb.items[2].label = "Editar"
            this.loading = false;
          }
        })
      }

    });

  }

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Formas de Pagamamento', link: '/forma-pagamento' },
      { label: 'Novo'}
    ],
  };

  salvarFormaPagamento() {
    if (this.formaPagamento.id) {
      this.subService = this.formaPagamentoService.update(this.formaPagamento.id, this.formaPagamento).subscribe({
        next: (res: FormaPagamento) => {
          this.poNotification.success('Forma de pagamento editada com sucesso!');
        }
      })
    }
    else {
      this.formaPagamento.id = this.formaPagamento.id || 0
      this.subService = this.formaPagamentoService.insert(this.formaPagamento).subscribe({
        next: (res: FormaPagamento) => {
          this.formaPagamento.id = res.id;
          this.poNotification.success('Forma de pagamento criada com sucesso!');
        }
      })
    }
  }

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvarFormaPagamento.bind(this) },
    { label: 'Cancelar', url: '/forma-pagamento' }
  ];

}
