import { Cidade } from "./Cidade.model";
import { Telefone } from "./Telefone.model";

export class Cliente {
    id: number;
    cpfCnpj: string;
    numero: string;
    complemento: string;
    bairro: string;
    nome: string;
    email: string;
    cep: string;
    logradouro: string;
    cidade: Cidade;
    telefones: Telefone[];
    idCliente: number;
    ativo: boolean;
    tipoCliente: number;
    nascimento: Date;

}