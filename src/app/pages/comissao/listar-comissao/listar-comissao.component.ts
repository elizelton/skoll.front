import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PoBreadcrumb, PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoTableColumn, PoTableLiterals } from '@po-ui/ng-components';
import { VendedorService } from '../../vendedor/vendedor.service';
import { ComissaoService } from '../comissao.service';
import * as moment from 'moment';

@Component({
  selector: 'app-listar-comissao',
  templateUrl: './listar-comissao.component.html',
  styleUrls: ['./listar-comissao.component.css']
})
export class ListarComissaoComponent implements OnInit {

  @ViewChild('pagamentoModal') pagamentoModal: PoModalComponent;

  total = 0;
  totalCount = 0;
  columns: Array<PoTableColumn> = [
    { property: 'idContrato', label: 'Contrato', type: 'number', width: '8%' },
    { property: 'cliente', label: 'Cliente', width: '30%' },
    { property: 'vendedor', label: 'Vendedor', width: '30%' },
    { property: 'percComis', label: 'Percentual de Comissão', width: '15%', type: 'currency', format: 'BRL' },
    { property: 'valorComissao', label: 'Valor de Comissão', width: '15%', type: 'currency', format: 'BRL' }
  ];

  customLiterals: PoTableLiterals = {
    noData: 'Sem contratos. Verifique os filtros.'
  };

  closeModal() {
    this.pagamentoModal.close();
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

  decreaseTotal(row: any) {
    if (row.valorComissao) {
      this.total -= row.valorComissao;
    }

    let index = this.listaContrato.indexOf(row.idContrato);
    if (index !== -1) {
      this.listaContrato.splice(index, 1);
    }

    this.totalCount = this.totalCount > 0 ? this.totalCount - 1 : 0;
  }

  sumTotal(row: any) {
    if (row.valorComissao) {
      this.total += row.valorComissao;
    }

    this.listaContrato.push(row.idContrato);
    this.totalCount++;
  }

  items: any;
  vendedorOptions;
  idVendedor;
  dataDe;
  dataAte;
  tipoFiltro;
  listaContrato = [];

  constructor(
    private vendedorService: VendedorService,
    private comissaoService: ComissaoService,
    public poDialog: PoDialogService,
    private poNotification: PoNotificationService
  ) {
    let subVendedor$ = this.vendedorService.getAll()
      .subscribe({
        next: (res: any) => {
          this.vendedorOptions = res.items.map(function (item) {
            return { label: item.nome, value: item.id };
          });
          subVendedor$.unsubscribe();
        }
      })
    this.limparFiltros();
  }

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Comissão' }]
  };

  @ViewChild('form', { static: true }) form: FormControl;

  ngOnInit(): void {
  }

  aplicarFiltro() {
    this.listaContrato = [];
    this.totalCount = 0;
    this.total = 0;
    this.comissaoService.getComissao(
      this.idVendedor,
      moment(this.dataDe).format("YYYY-MM-DD"),
      moment(this.dataAte).format("YYYY-MM-DD"),
      this.tipoFiltro
    )
      .subscribe({
        next: (res: any) => {
          if (res) {
            if (res.items.length) {
              this.items = res.items;
            }
            else {
              this.poNotification.warning({message: "Não encontrado registro para os filtros selecionados", duration: 6000 });
            }
          }
        },
        error: () => {
          this.poNotification.error({message: "Verifique os filtros selecionados.", duration: 6000 });
        }
      })
  }

  limparFiltros() {
    this.idVendedor = 0;
    this.dataDe = new Date();
    this.tipoFiltro = 0;
    this.listaContrato = [];
    this.totalCount = 0;
    this.total = 0;
    this.items = null;
    this.dataAte = moment(new Date()).endOf("month").toDate()
  }

  realizarPagamento() {
    this.poDialog.confirm({
      title: "Confirmar Operação",
      message: `Confirma pagamento dos contratos selecionados?`,
      confirm: () => {
        this.comissaoService.pagamentoComissao(
          this.idVendedor,
          this.tipoFiltro,
          this.listaContrato
        )
          .subscribe({
            next: () => {
              this.limparFiltros();
              this.poNotification.success({message: "Pagamentos realizados com sucesso", duration: 6000 });
            }
          })
      },
      cancel: () => { undefined }
    })


  }
}
