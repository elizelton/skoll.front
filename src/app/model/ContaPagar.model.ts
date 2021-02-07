import { ContaPagarParcela } from "./ContaPagarParcela.model";
import { Fornecedor } from "./Fornecedor.model";

export class ContaPagar {
    id: number;
    numParcelas: number;
    valorTotal: number;
    juros: number;
    ajuste: number;
    observacoes: string;
    ativo: boolean;
    diaInicial: number;
    diasPagamento: string;
    valorMensal: number;
    mesInicial: number;
    dataTermino: Date;
    fornecedor: Fornecedor;
    parcelas: ContaPagarParcela[]
}