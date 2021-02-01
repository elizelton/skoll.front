import { Cliente } from "./Cliente.model";
import { ContratoParcela } from "./ContratoParcela.model";
import { ContratoServico } from "./ContratoServico.model";
import { FormaPagamento } from "./FormaPagamento.model";
import { Usuario } from "./Usuario.model";
import { Vendedor } from "./Vendedor.model";

export class Contrato {
    id: number;
    qntdExemplares: number;
    tipoDocumento: number;
    numParcelas: number;
    valorTotal: number;
    juros: number;
    ajuste: number;
    observacoes: string;
    ativo: boolean;
    periodoMeses: number;
    dataInicio: Date;
    dataTermino: Date;
    parcelas: ContratoParcela[];
    servicos: ContratoServico[];
    formaPagamento: FormaPagamento;
    vendedor: Vendedor;
    usuario: Usuario;
    cliente: Cliente;

}