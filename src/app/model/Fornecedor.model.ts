import { Cidade } from "./Cidade.model";
import { Telefone } from "./Telefone.model";

export class Fornecedor {
    id: number;
    nome: string;
    cpfCnpj: string;
    numero: string
    complemento: string;
    bairro: string;
    email: string;
    cep: string;
    logradouro: string;
    cidade: Cidade
    telefones: Telefone[];
    idFornecedor: number;
    ativo: boolean;
    tipoFornecedor: number;
}
