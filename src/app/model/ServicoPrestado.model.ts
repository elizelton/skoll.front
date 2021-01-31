import { Produto } from "./Produto.model";

export class ServicoPrestado {
    id: number;
    nome: string;
    valorUnitario: number;
    ativo: boolean;
    produto: Produto
}