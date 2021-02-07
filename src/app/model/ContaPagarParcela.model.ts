import { ContaPagarParcelaPagamento } from "./ContaPagarParcelaPagamento.model";

export class ContaPagarParcela {
    id: number;
    idContaPagar: number;
    numParcela: number;
    valorParcela: number;
    dataVencimento: Date;
    ajuste: number;
    pagamentos: ContaPagarParcelaPagamento[];
}