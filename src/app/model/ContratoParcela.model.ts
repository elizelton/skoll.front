import { ContratoParcelaPagamento } from "./ContratoParcelaPagamento.model";

export class ContratoParcela {
    id: number;
    idContrato: number;
    numParcela: number;
    valorParcela: number;
    dataVencimento: string;
    situacao: number;
    comissao: number;
    ajuste: number;
    pagamentos: ContratoParcelaPagamento[];
}