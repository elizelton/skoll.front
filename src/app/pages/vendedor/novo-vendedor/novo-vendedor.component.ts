import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoNotificationService , PoPageAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Vendedor } from 'src/app/model/Vendedor.model';
import { VendedorService } from '../vendedor.service';


@Component({
  selector: 'app-novo-vendedor',
  templateUrl: './novo-vendedor.component.html',
  styleUrls: ['./novo-vendedor.component.css']
})
export class NovoVendedorComponent implements OnInit, OnDestroy {

  vendedor: Vendedor
  tituloPagina: string = "Novo Vendedor"
  private sub: Subscription;
  private subService: Subscription;
  loading: boolean = false
  constructor(
    private vendedorService: VendedorService,
    private route: ActivatedRoute,
    public poNotification: PoNotificationService) {

    this.vendedor = new Vendedor()
    this.vendedor.nome = ""
    this.vendedor.codigo = ""
    this.vendedor.percComis = 0
    this.vendedor.ativo = true
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if(this.subService)
      this.subService.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.vendedor.id = +params['id'];

      if (this.vendedor.id) {
        this.loading = true
        this.subService = this.vendedorService.get(this.vendedor.id).subscribe({
          next: (res: Vendedor) => {
            this.vendedor = res;
            this.tituloPagina = `Editar Vendedor #${res.id}`
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
      { label: 'Vendedores', link: '/vendedor' },
      { label: 'Novo' },
    ],
  };

  salvarVendedor() {
    if (this.vendedor.id) {
      this.subService = this.vendedorService.update(this.vendedor.id, this.vendedor).subscribe({
        next: () => {
          this.poNotification.success({message: 'Vendedor editado com sucesso!', duration: 6000 });
        }
      })
    }
    else {
      this.vendedor.id = this.vendedor.id || 0
      this.subService = this.vendedorService.insert(this.vendedor).subscribe({
        next: (res: Vendedor) => {
          this.vendedor.id = res.id;
          this.poNotification.success({message: 'Vendedor criado com sucesso!', duration: 6000 });
        }
      })
    }
  }

  public readonly actions: PoPageAction[] = [
    { label: 'Salvar', action: this.salvarVendedor.bind(this) },
    { label: 'Cancelar', url: '/vendedor' }
  ];


}
